import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Example: Fetch or generate some data
    const data = {
      message: "Hello, Next.js API!",
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
