import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../../lib/auth";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/reviewers/secure-pdf/[id]">
) {
  const { id } = await ctx.params;
  const session = await auth();

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const result = await fetch(`${process.env.BASE_API_URL}/reviewers/${id}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: session.user.accessToken,
      },
    });
    const data = await result.json();

    const res = await fetch(data.data.filepath);

    if (!res.ok) {
      return new NextResponse("Failed to fetch file", { status: 500 });
    }

    const buffer = Buffer.from(await res.arrayBuffer());

    return new NextResponse(buffer, {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-Custom-Header",

        "Content-Type": "application/pdf",
        "Content-Disposition": "inline", // show in iframe
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Error fetching file", { status: 500 });
  }
}
