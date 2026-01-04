"use client";

import React from "react";

export default function CopySpan({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        navigator.clipboard.writeText(e.currentTarget.innerText);
      }}
      title="Click to copy"
      className="text-blue-600 underline cursor-pointer hover:text-blue-500"
    >
      {children}
    </button>
  );
}
