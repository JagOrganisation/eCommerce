import ClientWrapper from './ClientWrapper';
import './globals.css';
import { Inter } from 'next/font/google';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Products'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
