import {
  Pinecone,
  PineconeRecord,
  RecordMetadata,
} from "@pinecone-database/pinecone";
import { nanoid } from "nanoid";

export async function upsert(vector: PineconeRecord<RecordMetadata>[]) {
  //connect to Pinecone
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT!,
  });

  const index = pinecone.index(process.env.PINECONE_INDEX_NAME!);

  //create a namespace
  const namespaceOne = index.namespace("test-namespace");
  const resultFromPinecone = await namespaceOne.upsert(vector);

  return resultFromPinecone;
}

export function prepareData(vector: number[][]) {
  let record: PineconeRecord[] = [];

  for (let i = 0; i < vector.length; i++) {
    let current: PineconeRecord = {
      id: nanoid(7),
      values: vector[i],
    };
    record.push(current);
  }

  return record;
}
