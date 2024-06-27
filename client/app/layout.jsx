import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryClientProvider } from "./ReactQueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Manajemen Aset",
  description: "Sistem Informasi Manajemen Aset DPRD Provinsi Sumatera Barat",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <Providers>{children}</Providers>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
