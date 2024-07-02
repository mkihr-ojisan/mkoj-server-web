"use client";

import { QueryClient, QueryClientProvider as RQQueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

export const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
    return <RQQueryClientProvider client={queryClient}>{children}</RQQueryClientProvider>;
};
