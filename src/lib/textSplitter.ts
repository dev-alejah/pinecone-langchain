import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 40,
  separators: ["\n\n", "\n", " ", ""],
});

async function splitText(text: string) {
  const documentChunks = await textSplitter.createDocuments([text]);
  return documentChunks;
}
