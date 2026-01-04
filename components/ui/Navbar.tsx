import { CircleUserIcon } from "lucide-react";
import React from "react";
import CopySpan from "../CopySpan";

export default function Navbar() {
  return (
    <div className="fixed flex flex-row w-screen justify-between items-center gap-3 px-3 border-b-2 border-white/20">
      <div className="col-span">A3AP - Arma III Admin Panel</div>
      <CircleUserIcon className="size-15 p-3" />
    </div>
  );
}
