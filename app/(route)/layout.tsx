import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
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
        <QueryProvider>
          <body className={`${pretendard.variable}`}>{children}</body>
        </QueryProvider>
      </html>
    </IntegrateMSW>
  );
}
