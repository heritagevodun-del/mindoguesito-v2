// components/Logo.tsx
import React from "react";

export default function Logo({
  className = "w-10 h-10",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          id="goldRoof"
          x1="160"
          y1="40"
          x2="160"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient
          id="goldBase"
          x1="160"
          y1="260"
          x2="160"
          y2="285"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#8B4513" />
        </linearGradient>
        <linearGradient id="woodPillar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4E342E" />
          <stop offset="40%" stopColor="#8D6E63" />
          <stop offset="60%" stopColor="#8D6E63" />
          <stop offset="100%" stopColor="#3E2723" />
        </linearGradient>
      </defs>

      {/* Ombre portée */}
      <ellipse
        cx="160"
        cy="300"
        rx="130"
        ry="12"
        fill="#5d4037"
        opacity="0.3"
        filter="blur(8px)"
      />

      {/* Piliers */}
      <path
        d="M90 140V260"
        stroke="url(#woodPillar)"
        strokeWidth="36"
        strokeLinecap="butt"
      />
      <path
        d="M90 140C100 160 80 180 90 200C100 220 80 240 90 260"
        stroke="#3E2723"
        strokeWidth="4"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M230 140V260"
        stroke="url(#woodPillar)"
        strokeWidth="36"
        strokeLinecap="butt"
      />
      <path
        d="M230 140C220 160 240 180 230 200C220 220 240 240 230 260"
        stroke="#3E2723"
        strokeWidth="4"
        fill="none"
        opacity="0.6"
      />

      {/* Éléments Dorés */}
      <rect
        x="60"
        y="260"
        width="200"
        height="25"
        rx="4"
        fill="url(#goldBase)"
        stroke="#8B4513"
        strokeWidth="2"
      />
      <path
        d="M160 40L280 140H40L160 40Z"
        fill="url(#goldRoof)"
        stroke="#8B4513"
        strokeWidth="3"
      />
    </svg>
  );
}
