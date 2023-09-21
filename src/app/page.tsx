"use client";

import { ChangeEvent, useState } from "react";
import Toast from "@/components/toast";

export default function Home() {
  const [file, setFile] = useState<File | null | undefined>();
  const [feedback, setFeedback] = useState<string>("none");
  const [question, setQuestion] = useState<string>("");

  // async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
  //   fileReader(file);
  // }

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    //reading the text content of the file
    const text = await file?.text();
    const response = await fetch("/api/fileToUpsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    })
      .then((response) => response.json())
      .then((text) => {
        console.log(text);
        setFeedback(text.textChunks);
      });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files?.[0]);
  }

  async function handleCreate() {
    let namespace = "first-namespace";

    //connect to pinecone
    const response = await fetch("/api/multiTenant");
    console.log(response.json());
  }

  async function handleScraper() {
    const response = await fetch("/api/scraper");
    console.log(response.json());
  }

  function handleQuestionChange(e: ChangeEvent<HTMLInputElement>) {
    setQuestion(e.currentTarget.value);
  }

  async function query() {
    const response = await fetch("/api/query");
    console.log(await response.json());
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen relative">
      <h3 className="text-white text-3xl font-bold absolute top-10">
        🛝 NextJS x Langchain x Pinecone Playground
      </h3>
      <div className="flex items-end gap-x-4 absolute top-[8em]">
        <div className="flex flex-col gap-y-2 w-[40em]">
          <label htmlFor="query" className="text-sm text-stone-500">
            Question
          </label>
          <input
            type="text"
            name="query"
            id="query"
            placeholder="Ask me a question."
            className="px-4 py-2 rounded bg-black outline-none border border-stone-800"
            onChange={handleQuestionChange}
          />
        </div>
        <button
          className="px-4 py-2 rounded bg-stone-300 text-stone-800"
          onClick={query}
        >
          Ask
        </button>
      </div>
      <div className="flex gap-x-4">
        <button
          onClick={handleCreate}
          className="px-4 py-2 rounded bg-stone-300 text-stone-800"
        >
          💻 Create a namespace
        </button>
        <button
          className="px-4 py-2 rounded bg-stone-300 text-stone-800"
          onClick={handleScraper}
        >
          📝 Scrape the website
        </button>
      </div>
      <div className="w-full flex justify-center mt-[2em]">
        <label htmlFor="txtFile"></label>
        <input
          type="file"
          name="txtFile"
          accept=".txt"
          className="outline-none w-5/12 rounded border border-stone-800 py-1 mr-6"
          onChange={handleChange}
        />
        <button
          type="button"
          className="px-4 py-2 rounded bg-stone-300 text-stone-800"
          onClick={handleSubmit}
        >
          Upload
        </button>
      </div>
      <section>{feedback !== "none" && <p>{feedback}</p>}</section>
      <Toast />
    </div>
  );
}
