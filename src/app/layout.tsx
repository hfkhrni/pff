import type { Metadata } from 'next';
import { JetBrains_Mono, Inter, Newsreader } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Providers from './(main)/_components/providers';
import { Toaster } from '@/components/ui/toaster';
import 'simplebar-react/dist/simplebar.min.css';

const inter = Inter({ subsets: ['latin'] });

const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-newsreader',
  weight: ['300', '400', '500', '700'],
  adjustFontFallback: false,
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  weight: ['300', '400', '500', '700'],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={cn(
            'font-sans antialiased',
            inter.className,
            newsreader.variable,
            jetbrains.variable
          )}
        >
          <Toaster />
          {children}
        </body>
      </html>
    </Providers>
  );
}

// 'max-h-screen font-sans antialiased grainy',
