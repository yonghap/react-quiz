'use client';

import '@/styles/globals.css';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import bgImage from '@/assets/images/colored_body_top.png';
const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="ko">
		<body className="min-h-screen font-pretendard">
			<div>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</div>
		</body>
		</html>
	);
}