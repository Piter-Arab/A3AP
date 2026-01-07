"use client";

import React, { useState, useEffect } from "react";
import Container from "./Container";
import Button from "./Button";
import { getServerStatus, toggleServer } from "@/actions/server-control";

export default function ArmaCard({
  avalible,
  setIsAvalible,
}: {
  avalible: boolean;
  setIsAvalible: React.Dispatch<React.SetStateAction<"arma" | "ark" | "null">>;
}) {
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkStatus = async () => {
    const result = await getServerStatus("arma");
    setIsOnline(result.isOnline);
    setIsAvalible(result.isOnline ? "arma" : "null");
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = async (action: string) => {
    setIsLoading(true);

    try {
      if (action === "upcheck") {
        await checkStatus();
      } else if (action === "restart") {
        await toggleServer("arma", "stop");
        await new Promise((r) => setTimeout(r, 10000));
        await toggleServer("arma", "start");
      } else {
        await toggleServer("arma", action as "start" | "stop");
      }

      setTimeout(checkStatus, 2000);
    } catch (error) {
      console.error("Action failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      className={`flex-1 flex flex-col justify-between ${avalible ? "border-red-500/20" : ""}`}
    >
      <p>Arma III Server</p>

      <p className="text-sm text-neutral-400">
        Status:{" "}
        <span
          className={
            isOnline ? "text-green-500 font-bold" : "text-red-500 font-bold"
          }
        >
          {isLoading
            ? "Hmmm... Let me check..."
            : isOnline
              ? "ONLINE"
              : "OFFLINE"}
        </span>
      </p>

      <div className="grid grid-cols-4 gap-3">
        <Button
          action="start"
          onClick={() => handleAction("start")}
          disabled={isOnline || isLoading}
        />
        <Button
          action="stop"
          onClick={() => handleAction("stop")}
          disabled={!isOnline || isLoading}
        />
        <Button
          action="restart"
          onClick={() => handleAction("restart")}
          disabled={!isOnline || isLoading}
        />
        <Button
          action="upcheck"
          onClick={() => handleAction("upcheck")}
          disabled={isLoading}
        />
      </div>
    </Container>
  );
}
