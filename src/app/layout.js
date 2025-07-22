import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "./(components)/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "../lib/utils";
import { Sidebar } from "./(components)/layout/sidebar";
import { Header } from "./(components)/layout/header";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Student Dashboard",
  description: "School Management System for Students",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen w-full">
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <Header />
              <main className="flex-1 p-4 ml-6 sm:p-6 sm:pl-14">{children}</main>
            </div>
          </div>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}