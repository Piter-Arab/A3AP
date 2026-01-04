"use client";

import { getConsoleLogs } from "@/actions/logs";
import React, { useEffect, useState, useRef } from "react";

export default function ConsoleLogs() {
  const [logs, setLogs] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      const logData = await getConsoleLogs();
      setLogs(logData);
    };

    fetchLogs();

    const interval = setInterval(fetchLogs, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });

  return (
    <div
      ref={scrollRef}
      className="h-full overflow-y-auto whitespace-pre-wrap text-sm"
    >
      {logs || "Waiting for server logs..."}
    </div>
  );
}
