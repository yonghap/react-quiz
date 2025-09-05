import '@/styles/globals.css';
import { ReactNode } from 'react';
import Header from "@/components/navigation";
import Footer from "@/components/footer";
import QueryProvider from '@/components/QueryProvider'; // 클라이언트 컴포넌트

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        />
        <title>요덜이의 Next.js 앱</title>
        <meta name="description" content="App Router 구조에서 메타데이터 설정 예제" />
      </head>
      <body className="bg-gray-200">
        <div className="overflow-hidden min-h-screen max-w-[600px] m-auto bg-white font-pretendard">
          <Header />
          <QueryProvider>
            {children}
          </QueryProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}