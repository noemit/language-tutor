import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/components/shared/BottomNav";
import { AppHeader } from "@/components/shared/AppHeader";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Language Tutor",
  description: "Translate and learn with smart flashcards",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Language Tutor",
  },
  icons: {
    icon: "/icon-192x192.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#FDF8F0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background">
        <AuthProvider>
          <AppHeader />
          <main className="flex-1 flex flex-col overflow-y-auto pb-24">
            {children}
          </main>
          <BottomNav />
        </AuthProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
