import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/provider";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Manajemen Aset",
  description: "Sistem Informasi Manajemen Aset DPRD Provinsi Sumatera Barat",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <Providers>
            {children}
            <Toaster richColors position="bottom-right" />
          </Providers>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
