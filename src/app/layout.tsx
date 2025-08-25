'use client';

import '@/styles/globals.css';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from "@/components/navigation";
import Footer from "@/components/footer";
import logo from '@/assets/images/bg_main.png'
const queryClient = new QueryClient();


export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="ko">
			<head>
        <meta
          name="viewport"
          content="initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=no;"
        />
      </head>
			<body className="bg-gray-200">
				<div className="overflow-hidden min-h-screen max-w-[600px] m-auto bg-white font-pretendard">
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