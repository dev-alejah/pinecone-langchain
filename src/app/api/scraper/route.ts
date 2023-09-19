import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { load } from "cheerio";
import { splitText } from "@/lib/textSplitter";
import { createVectorEmbeddings } from "@/lib/createVectors";
import { prepareData, upsert } from "@/lib/upsert";
export async function GET(req: NextRequest) {
  const url = "https://en.wikipedia.org/wiki/Norman,_Oklahoma";

  const response = await fetch(url);
  const html = await response.text();

  const words: string[] = [];
  //cheerio
  const cheer = load(html);
  cheer(".mw-headline, p", html).each(function () {
    const line: string = cheer(this).text();
    words.push(line);
  });

  console.log(words.toString());

  //split the text
  const textChunks = await splitText(words.toString());

  //creat embeddings
  const vectorEmbeddings = await createVectorEmbeddings(textChunks);

  //prepare data
  const record = prepareData(vectorEmbeddings);

  //upsert data to Pinecone
  const pineconeReturn = await upsert(record);

  return NextResponse.json({ vectorEmbeddings: vectorEmbeddings });
}
