import React from "react";

interface LatinCrossProps {
  className?: string;
  color?: string;
}

/**
 * Pure SVG Latin Cross component
 * Prevents Apple iOS / Safari from rendering standard Unicode cross (✝)
 * as a purple square emoji (✝️)
 */
export default function LatinCross({
  className = "w-3.5 h-3.5",
  color = "currentColor",
}: LatinCrossProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={color}
      className={`inline-block flex-shrink-0 select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M10.5 2C10.5 1.45 10.95 1 11.5 1H12.5C13.05 1 13.5 1.45 13.5 2V7.5H18.5C19.05 7.5 19.5 7.95 19.5 8.5V9.5C19.5 10.05 19.05 10.5 18.5 10.5H13.5V22C13.5 22.55 13.05 23 12.5 23H11.5C10.95 23 10.5 22.55 10.5 22V10.5H5.5C4.95 10.5 4.5 10.05 4.5 9.5V8.5C4.5 7.95 4.95 7.5 5.5 7.5H10.5V2Z" />
    </svg>
  );
}
