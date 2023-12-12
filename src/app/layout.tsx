import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { GlobalProvider } from "./context/globalcontext";
// import "bootstrap/dist/css/bootstrap.min.css";

const poppins = Poppins({ weight: ["300"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CredHive",
  description: "Financial Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalProvider>
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
    </GlobalProvider>
  );
}
