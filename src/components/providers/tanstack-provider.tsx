"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "../../app/get-query-client";

interface TanstackProviderProps {
  children: React.ReactNode;
}

export const TanstackProvider = ({ children }: TanstackProviderProps) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
