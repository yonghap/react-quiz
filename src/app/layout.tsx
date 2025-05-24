'use client';

import '@/styles/globals.css';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from "@/components/navigation";
import Footer from "@/components/footer";
const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="ko">
			<body className="bg-gray-200">
				<div className="min-h-screen max-w-[768px] m-auto bg-white font-pretendard">
					<Header></Header>
					<QueryClientProvider client={queryClient}>
						{children}
					</QueryClientProvider>
					<Footer></Footer>
				</div>
			</body>
		</html>
	);
}