import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ti Kloud",
  description: "The new generation of cloud providers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
