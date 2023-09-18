import { NextRequest, NextResponse } from "next/server";
import { splitText } from "@/lib/textSplitter";
import { createVectorEmbeddings } from "@/lib/createVectors";
import { prepareData, upsert } from "@/lib/upsert";

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  //split the text
  const textChunks = await splitText(text);

  //creat embeddings
  const vectorEmbeddings = await createVectorEmbeddings(textChunks);

  //prepare data
  const record = prepareData(vectorEmbeddings);

  //upsert data to Pinecone
  const pineconeReturn = await upsert(record);

  return NextResponse.json({
    textChunks: textChunks,
    embeddings: vectorEmbeddings,
    record: record,
    upsert: pineconeReturn,
    message: "file has been successfully read.",
  });
}
