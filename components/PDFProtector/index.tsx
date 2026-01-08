"use client";

import { useEffect } from "react";

export default function PDFProtector({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl or Cmd (Mac)
      if (e.ctrlKey || e.metaKey) {
        const blocked = ["s", "p", "u"]; // ⛔ block Save, Print, View Source
        if (blocked.includes(e.key.toLowerCase())) {
          e.preventDefault();
          alert("Action disabled on this page");
        }
      }

      // Extra: Block F12 (DevTools)
      if (e.key === "F12") {
        e.preventDefault();
        alert("Action disabled");
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <div>{children}</div>;
}
