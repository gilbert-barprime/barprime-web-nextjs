"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  Download,
  Expand,
  GalleryHorizontal,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { PageProps } from "react-pdf";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Session } from "../../types";
import { customFetch } from "../../lib/helper";
import { toast } from "react-toastify";

const Document = dynamic(
  () => import("react-pdf").then((mod) => mod.Document),
  { ssr: false }
);
const Page = dynamic(() => import("react-pdf").then((mod) => mod.Page), {
  ssr: false,
});

type PropsType = {
  id: string;
  file_path: string;
  callbackURL: string;
  pageSession: Session | null;
  subjectId: string;
  enabledDownload: boolean;
};

export default function PDFViewer(props: PropsType) {
  const { data: session, status } = useSession();
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState(1.0);

  const [pageWidth, setPageWidth] = useState<number | null>(null);
  const [pageHeight, setPageHeight] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(undefined, {
        callbackUrl: props.callbackURL,
      });
    }
  }, [status]);

  useEffect(() => {
    (async () => {
      const { pdfjs } = await import("react-pdf");
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
      ).toString();
    })();
  }, []);

  useEffect(() => {
    if (props.pageSession && props.pageSession.metadata) {
      const { current_page } = props.pageSession.metadata;
      setPageNumber(current_page || 1);
    }
  }, [props.pageSession]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // Capture original PDF page size
  function onPageLoadSuccess(
    page: Parameters<NonNullable<PageProps["onLoadSuccess"]>>[0]
  ) {
    setPageWidth(page.originalWidth);
    setPageHeight(page.originalHeight);
  }

  // Fit to width
  function fitToWidth() {
    if (containerRef.current && pageWidth) {
      const containerWidth = containerRef.current.offsetWidth;
      setScale(containerWidth / pageWidth);
    }
  }

  // Fit to page (both width and height)
  function fitToPage() {
    if (containerRef.current && pageWidth && pageHeight) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      const scaleX = containerWidth / pageWidth;
      const scaleY = containerHeight / pageHeight;
      setScale(Math.min(scaleX, scaleY));
    }
  }

  const addWatermarkAndDownload = async (): Promise<void> => {
    try {
      // Fetch the original PDF
      setDownloading(true);
      const existingPdfBytes = await fetch(props.file_path).then((res) =>
        res.arrayBuffer()
      );

      // Load PDF with pdf-lib
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Add watermark to each page
      const pages = pdfDoc.getPages();
      pages.forEach((page) => {
        const { width, height } = page.getSize();

        const watermarkText = session?.user?.email || "CONFIDENTIAL";
        const textWidth = font.widthOfTextAtSize(watermarkText, 24);

        page.drawText(watermarkText, {
          x: (width - textWidth) / 2 + 70,
          y: height / 2 - 200,
          size: 24,
          opacity: 0.2,
          color: rgb(0.612, 0.639, 0.686),
          rotate: degrees(45),
        });
      });

      // Save modified PDF
      const pdfBytes = await pdfDoc.save();

      // Convert to ArrayBuffer and assert correct type
      const arrayBuffer = pdfBytes.buffer.slice(
        pdfBytes.byteOffset,
        pdfBytes.byteOffset + pdfBytes.byteLength
      ) as ArrayBuffer;

      // Create Blob for download
      const blob = new Blob([arrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      // Trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = `document-${props.id}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloading(false);
    } catch (err) {
      console.error("Error adding watermark:", err);
      setDownloading(false);
    }
  };

  const handlePageChange = async (pageNum: number) => {
    if (!props.pageSession) return;

    const result = await customFetch({
      url: `/sessions/${props.pageSession?._id}`,
      method: "PUT",
      data: JSON.stringify({
        current_page: pageNum,
        subject_id: props.subjectId,
      }),
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      toast.error("Something went wrong!");
      return;
    }
  };

  if (!session) return null;

  return (
    <div className="flex flex-col items-center h-screen">
      {/* Controls */}
      <div className="flex items-center gap-2 py-2">
        <button onClick={() => setScale(scale + 0.2)} className="btn btn-sm">
          <ZoomIn />
          Zoom In
        </button>
        <button
          className="btn btn-sm"
          onClick={() => setScale(scale - 0.2)}
          disabled={scale <= 0.5}
        >
          <ZoomOut />
          Zoom Out
        </button>
        <button className="btn btn-sm" onClick={fitToWidth}>
          <GalleryHorizontal />
          Fit to Width
        </button>
        <button className="btn btn-sm" onClick={fitToPage}>
          <Expand />
          Fit to Page
        </button>
        {/* Hide Download button for now */}
        {props.enabledDownload && (
          <button
            onClick={addWatermarkAndDownload}
            className={"btn btn-sm"}
            disabled={downloading}
          >
            <Download /> {downloading ? "Downloading..." : "Download PDF"}
          </button>
        )}
      </div>

      {/* PDF Container */}
      <div
        ref={containerRef}
        className=" flex-grow w-full flex justify-center items-start overflow-auto bg-gray-200 p-4"
        onContextMenu={(e) => e.preventDefault()} // ⛔ disable right-click
      >
        <div
          ref={viewerRef}
          className="bg-white shadow-lg p-2 relative overflow-hidden"
        >
          <Document
            file={props.file_path}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderAnnotationLayer
              renderTextLayer={false}
              onLoadSuccess={onPageLoadSuccess}
            />
            {/* Watermark overlay */}
            <div className="absolute inset-0 grid pointer-events-none">
              <span className="text-2xl font-bold text-gray-400 opacity-20 select-none rotate-[-44deg] absolute top-[56%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                {session.user?.email || "CONFIDENTIAL"}
              </span>
            </div>
          </Document>
        </div>
      </div>

      {/* Page navigation */}
      <div className="flex items-center gap-2 py-2">
        <button
          disabled={pageNumber <= 1}
          onClick={() =>
            setPageNumber((p) => {
              handlePageChange(pageNumber - 1);
              return p - 1;
            })
          }
          className="btn btn-sm"
        >
          <ArrowBigLeftDash /> Prev
        </button>
        <span>
          Page {pageNumber} of {numPages}
        </span>
        <button
          disabled={pageNumber >= numPages}
          onClick={() =>
            setPageNumber((p) => {
              handlePageChange(pageNumber + 1);
              return p + 1;
            })
          }
          className="btn btn-sm"
        >
          Next <ArrowBigRightDash />
        </button>
      </div>
    </div>
  );
}
