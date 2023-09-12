"use client";

import { useState } from "react";
import { fileReader } from "@/lib/uploader";

export default function Home() {
  const [file, setFile] = useState<File | null | undefined>();
  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    fileReader(file);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files?.[0]);
  }
  return (
    <div className="flex items-center justify-center w-full h-screen">
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
  );
}
