import '@/styles/globals.css';
import { ReactNode } from 'react';
import Header from "@/components/navigation";
import Footer from "@/components/footer";
import QueryProvider from '@/components/QueryProvider'; // 클라이언트 컴포넌트
import { Suspense } from 'react';

export default function QuizLayout({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}