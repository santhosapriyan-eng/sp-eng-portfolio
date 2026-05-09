import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Santhosa Priyan K A — AI/ML Engineer · SP.ENG',
  description: 'B.Tech CSE (AI/ML) student at Karunya Institute. Cisco-certified Python & IoT developer. Building intelligent systems from Coimbatore, India.',
  keywords: ['AI/ML Engineer', 'Python Developer', 'IoT', 'Santhosa Priyan', 'Karunya Institute', 'Coimbatore', 'SP.ENG'],
  authors: [{ name: 'Santhosa Priyan K A', url: 'https://santhosapriyan.eng' }],
  creator: 'Santhosa Priyan K A',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://santhosapriyan.eng',
    title: 'Santhosa Priyan K A — AI/ML Engineer · SP.ENG',
    description: 'Cinematic portfolio of an AI/ML engineer from Coimbatore, India.',
    siteName: 'SP.ENG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Santhosa Priyan K A — SP.ENG',
    description: 'B.Tech CSE (AI/ML) student. Cisco-certified. Building the future.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#020617',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg font-grotesk antialiased">{children}</body>
    </html>
  );
}
