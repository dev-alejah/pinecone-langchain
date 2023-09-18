import {
  Pinecone,
  PineconeRecord,
  RecordMetadata,
} from "@pinecone-database/pinecone";
import { NextResponse } from "next/server";

export async function GET() {
  //connect to pinecone
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT!,
  });

  const index = pinecone.index(process.env.PINECONE_INDEX_NAME!);

  //create a namespace
  const namespaceOne = index.namespace("alejah-namespace");
  const pineconeUpsert = await namespaceOne.upsert([
    {
      id: "id-1",
      values: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
    },
  ]);
  return NextResponse.json({
    namespaceOne: namespaceOne,
    // pineconeUpsert: pineconeUpsert,
    message: "Successfully created namespace",
  });
}
