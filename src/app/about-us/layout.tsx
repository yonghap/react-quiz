'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<div>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</div>
	);
}