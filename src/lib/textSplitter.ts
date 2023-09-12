import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 40,
  separators: ["\n\n", "\n", " ", ""],
});

export async function splitText(text: string) {
  const textChunks = await textSplitter.splitText(text);
  return textChunks;
}
