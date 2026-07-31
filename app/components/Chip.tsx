"use client";

import type { ReactNode } from "react";

type ChipProps = {
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

export default function Chip({ selected, onClick, children }: ChipProps) {
  return (
    <button
      type="button"
      className={`lds-chip${selected ? " lds-chip--selected" : ""}`}
      aria-pressed={selected}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
