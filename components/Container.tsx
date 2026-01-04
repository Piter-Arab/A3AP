import React, { ReactNode } from "react";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`p-6 rounded-2xl border-2 border-white/20 ${className}`}>
      {children}
    </div>
  );
}
