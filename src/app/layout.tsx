import "./globals.css";
import React from "react";
import { ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import QueryProvider from "@/components/QueryProvider";

export const metadata = {
  title: "ggYu",
  description: "즐거운 퀴즈 세상 ggYu입니다.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className="bg-gray-100 p-5 sm:p-10">
        <div className="overflow-hidden max-w-[600px] m-auto bg-white font-pretendard rounded-2xl shadow-lg">
          <QueryProvider>{children}</QueryProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
