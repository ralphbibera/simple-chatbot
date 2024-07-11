import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AuthContextProvider from "@/providers/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple Chat",
  description: "Basic chat room implementation",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <html lang="en" className="h-screen">
        <body className={cn(inter.className, "h-full")}>{children}</body>
      </html>
    </AuthContextProvider>
  );
}
export default RootLayout;
