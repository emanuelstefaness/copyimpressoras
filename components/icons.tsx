import type { SVGProps } from "react";

/* Lucide-style single-path (or multi-node) icons, drawn as strokes. */
const PATHS: Record<string, string> = {
  // services
  printer: "M6 9V3h12v6M6 18h12v3H6zM4 9h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1z",
  filament: "M12 3v3m0 0a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 13v2M12 9v6",
  cartridge: "M4 8h16v9H4zM8 8V5h8v3M8 12h6",
  toner: "M3 9h15l3 3v3l-3 3H3zM7 12h6",
  // differentiators
  zap: "M13 2 4 14h7l-1 8 9-12h-7z",
  shield: "M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z",
  headset: "M4 12a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-1v-6h3M4 12v5a2 2 0 0 0 2 2h1v-6H4",
  award: "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.5 13.5 7 22l5-3 5 3-1.5-8.5",
  truck: "M3 6h11v9H3zM14 9h4l3 3v3h-7zM7 18a1.5 1.5 0 1 0 .01 0M18 18a1.5 1.5 0 1 0 .01 0",
  tag: "M3 3h7l11 11-7 7L3 10zM7 7h.01",
  // ui / contact
  arrow: "M5 12h14M13 6l6 6-6 6",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  play: "M8 5v14l11-7z",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  pin: "M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 7v5l3 2",
  chevronL: "M15 6l-6 6 6 6",
  chevronR: "M9 6l6 6-6 6",
  chevronDown: "M6 9l6 6 6-6",
  users: "M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 20v-2a4 4 0 0 0-3-3.9M16 2.1a4 4 0 0 1 0 7.8",
  box: "M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8",
  sparkle: "M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z",
  facebook: "M15 3h-2a4 4 0 0 0-4 4v3H6v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2z",
  instagram: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM17.5 6.5h.01",
};

type IconName = keyof typeof PATHS;

export function Icon({
  name,
  stroke = "currentColor",
  strokeWidth = 1.7,
  ...props
}: { name: IconName; strokeWidth?: number } & SVGProps<SVGSVGElement>) {
  const raw = PATHS[name];
  const inner = raw.startsWith("<") ? raw : `<path d="${raw}"/>`;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: inner }}
      {...props}
    />
  );
}

export function Whatsapp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1s-.5-.1-.7.2-.8 1-.9 1.1-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.6.3-.5v-.5L9 6.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3c-.3.3-1 1-1 2.3s1 2.7 1.2 2.9 2 3 4.8 4.2c2.4 1 2.4.7 2.8.6s1.7-.7 2-1.3.3-1.3.2-1.4z" />
      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20z" />
    </svg>
  );
}
