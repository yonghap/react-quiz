import '@/styles/globals.css';
import { ReactNode } from 'react';
import QueryProvider from '@/components/QueryProvider'; // 클라이언트 컴포넌트

export default function QuizLayout({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}