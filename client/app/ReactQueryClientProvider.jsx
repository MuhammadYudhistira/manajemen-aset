"use client";

const { QueryClient, QueryClientProvider } = require("@tanstack/react-query");

const queryClient = new QueryClient();

export const ReactQueryClientProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
