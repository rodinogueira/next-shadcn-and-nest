import './styles/globals.css';
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin']});

export const metadata = {
  title: 'Next.js Shadcn Items',
  description: 'An example using Next.js, Shadcn UI, and Zod',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        inter.className
      )}
      >{children}</body>
    </html>
  );
}
