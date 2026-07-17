import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#050505",
};

export const metadata: Metadata = {
  title: "Copy Impressoras — Tecnologia que impulsiona o seu negócio",
  description:
    "Locação de impressoras, filamentos 3D, cartuchos e toners com qualidade, economia e suporte especializado. Soluções completas em impressão para a sua empresa.",
  keywords: [
    "locação de impressoras",
    "filamentos 3D",
    "cartuchos",
    "toners",
    "outsourcing de impressão",
    "Copy Impressoras",
  ],
  openGraph: {
    title: "Copy Impressoras — Soluções completas em impressão",
    description:
      "Locação de impressoras, filamentos 3D, cartuchos e toners com qualidade, economia e suporte especializado.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
