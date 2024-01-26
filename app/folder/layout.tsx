import type { Metadata } from "next";

export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode }>) {
  return (
    <div>
      <h1>THIS IS COMMON LAYOUT</h1>
      <div>
        {children}
      </div>
    </div>
  );
}
