import type { Metadata } from "next";
import "./scss/index.scss";

export const metadata: Metadata = {
  title: "Recipe Provider",
  description: "Provides recipies based on food found in the picture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
