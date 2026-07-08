import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatIcons from '@/components/layout/ChatIcons';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: {
    default: 'Allpayacu – Amazon Jungle Retreats & Ayahuasca Ceremonies in Peru',
    template: '%s | Allpayacu',
  },
  description:
    'Indigenous-owned ayahuasca retreats and Amazon jungle tours in Iquitos, Peru. Rooted in Yagua tradition. Safety-first. For the people, for the spirit, for the jungle.',
  keywords: ['ayahuasca retreat Peru', 'Amazon jungle tour', 'Iquitos retreat', 'Yagua tradition', 'jungle survival', 'indigenous ceremony'],
  openGraph: {
    siteName: 'Allpayacu',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatIcons />
      </body>
    </html>
  );
}
