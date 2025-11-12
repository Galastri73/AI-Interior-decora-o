
import React from 'react';

const MagicWandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 4V2" />
    <path d="M15 10V8" />
    <path d="M12.5 6.5L14 5" />
    <path d="M6 21L21 6" />
    <path d="M11 3L9 5" />
    <path d="M18 9l2-2" />
    <path d="M20 14l-2-2" />
    <path d="M3 11l2-2" />
    <path d="M5 9l-2-2" />
  </svg>
);

export default MagicWandIcon;
