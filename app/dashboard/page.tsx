"use client";

import ArkCard from "@/components/ArkCard";
import ConsoleLogs from "@/components/ConsoleLogs";
import Container from "@/components/Container";
import ArmaCard from "@/components/ArmaCard";
import React, { useState } from "react";

export default function page() {
  const [isAvalible, setIsAvalible] = useState<"arma" | "ark" | "null">("null");

  return (
    <div className="grid grid-cols-2 grid-rows-4 gap-3 p-3 pt-19 h-screen">
      <ArmaCard
        setIsAvalible={setIsAvalible}
        avalible={isAvalible === "arma"}
      />
      <ArkCard setIsAvalible={setIsAvalible} avalible={isAvalible === "ark"} />
      <Container className="col-span-2 h-full row-span-3">
        LOGS
        <ConsoleLogs />
      </Container>
    </div>
  );
}
