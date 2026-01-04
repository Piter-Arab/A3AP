import ConsoleLogs from "@/components/ConsoleLogs";
import Container from "@/components/Container";
import DashCard from "@/components/DashCard";
import React from "react";

export default function page() {
  return (
    <div className="grid grid-cols-2 grid-rows-4 gap-3 p-3 pt-19 h-screen">
      <DashCard />
      <Container>
        <p>Players (WIP)</p>
        <div className="divide-y divide-white/10">
          <p>Player uno</p>
          <p>Player dos</p>
          <p>Player tres</p>
        </div>
      </Container>
      <Container className="col-span-2 h-full row-span-3">
        LOGS
        <ConsoleLogs />
      </Container>
    </div>
  );
}
