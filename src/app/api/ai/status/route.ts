import { connection, NextResponse } from "next/server";

export async function GET() {
  await connection();
  return NextResponse.json({ configured: true, model: "LOCAL WORLD ENGINE" }, { headers: { "Cache-Control": "no-store" } });
}
