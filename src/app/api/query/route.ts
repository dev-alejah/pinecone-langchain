import { NextRequest, NextResponse } from "next/server";
import query from "@/lib/query-pinecone";
// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(config);

// // IMPORTANT! Set the runtime to edge
// export const runtime = "edge";
export async function GET() {
  // const { question } = await request.json();
  const result = await query();
  console.log("This is the result");
  return NextResponse.json({ msg: "helo" });
}
