import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import { GlobalSnackbarProvider } from "@/providers/GlobalSnackBar";

import { QueryProvider } from "app/providers";
import IntegrateMSW from "app/providers/MSWProvider";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.ttf",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Y-edu",
  description: "Y-edu 공식 홈페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <IntegrateMSW>
      <html lang="ko">
        <body className={`${pretendard.variable}`}>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
          <QueryProvider>
            <GlobalSnackbarProvider>{children}</GlobalSnackbarProvider>
          </QueryProvider>
        </body>
      </html>
    </IntegrateMSW>
  );
}
