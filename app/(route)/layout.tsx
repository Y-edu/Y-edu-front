import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { QueryProvider } from "../providers";
import { initMsw } from "../../__mocks__/init";
import IntegrateMSW from "../providers/MSWProvider";
import { Sidebar } from "../ui";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.ttf",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (process.env.NODE_ENV !== "production") {
    initMsw();
  }
  return (
    <IntegrateMSW>
      <html lang="en">
        <QueryProvider>
          <body className={`${pretendard.variable} ml-[180px]`}>
            <Sidebar />
            {children}
          </body>
        </QueryProvider>
      </html>
    </IntegrateMSW>
  );
}
