import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MTA Live Map",
  description: "MTA Live Map Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
