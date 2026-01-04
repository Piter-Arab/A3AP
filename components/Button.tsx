import React from "react";

type ButtonProps = {
  action: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({ action, onClick, disabled }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`capitalize px-2 py-1 border-2 border-white/20 rounded-lg cursor-pointer hover:opacity-60 transition-all`}
    >
      {action}
    </button>
  );
}
