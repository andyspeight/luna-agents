import type { ReactNode } from 'react';

export const metadata = {
  title: 'Luna Agents - Found Money',
  description: 'Phase 0 - the found-money re-engagement agent. Stage 1: find and rank opportunities.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
          color: '#0f172a',
          background: '#f8fafc',
        }}
      >
        {children}
      </body>
    </html>
  );
}
