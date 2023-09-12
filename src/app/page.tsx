"use client";

import { FormEventHandler } from "react";

export default function Home() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(event);
  }
  return (
    <div className="flex items-center w-full h-screen">
      <form onSubmit={handleSubmit} className="w-full flex justify-center">
        <label htmlFor="txtFile"></label>
        <input
          type="file"
          name="txtFile"
          accept=".txt"
          className="outline-none w-5/12 rounded border border-stone-800 py-1 mr-6"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-stone-300 text-stone-800"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
