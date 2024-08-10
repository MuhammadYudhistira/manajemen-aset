import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/provider";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import { Toaster } from "sonner";
import { ViewTransitions } from 'next-view-transitions'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Manajemen Aset",
  description: "Sistem Informasi Manajemen Aset DPRD Provinsi Sumatera Barat",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={inter.className}>
          <ReactQueryProvider>
            <Providers>
              {children}
              <Toaster richColors position="bottom-right" closeButton />
            </Providers>
          </ReactQueryProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
