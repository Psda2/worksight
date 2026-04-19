import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry';
import DashboardLayout from '@/components/DashboardLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hayleys WorkSight',
  description: 'Workforce Planning & Execution System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <DashboardLayout>{children}</DashboardLayout>
        </ThemeRegistry>
      </body>
    </html>
  );
}
