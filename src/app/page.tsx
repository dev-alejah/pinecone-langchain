"use client";

import { useState } from "react";
import { fileReader } from "@/lib/fileReader";

export default function Home() {
  const [file, setFile] = useState<File | null | undefined>();
  const [feedback, setFeedback] = useState<string>("none");
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
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <button
        onClick={handleCreate}
        className="px-4 py-2 rounded bg-stone-300 text-stone-800"
      >
        Create a namespace
      </button>
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
    </div>
  );
}
