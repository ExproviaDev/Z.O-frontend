import { Geist, Geist_Mono, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./store/ReduxProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
export const metadata = {
  title: {
    default: "Zero Olympiad | Cultivating Global Leaders from Bangladesh",
    template: "%s | Zero Olympiad"
  },
  publisher: "Zero Olympiad",
  description: "Zero Olympiad empowers students to become Global Citizens by mastering the UN's 17 SDGs. From Zero Poverty to Zero Hunger, we prepare future leaders to navigate World Affairs, Global Policies, and Diplomacy by 2030.",
  keywords: [
    "Zero Olympiad",
    "faatiha aayat",
    "Sustainable Development Goals",
    "SDGs 2030",
    "Zero Poverty",
    "Zero Hunger",
    "Global Leadership Bangladesh",
    "World Affairs for Students",
    "United Nations SDGs",
    "Global Citizenship",
    "International Personalities",
  ],
  authors: [{ name: "Faatiha Aayat", url: "https://www.zeroolympiad.com" }],
  metadataBase: new URL("https://www.zeroolympiad.com"),

  // ✅ নতুন ভেরিফিকেশন কোড এখানে অ্যাড করা হলো
  verification: {
    other: {
      "facebook-domain-verification": "4s0xfda5xnjoupb00g4liq2f92x8te",
    },
  },

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://www.zeroolympiad.com",
  },
  openGraph: {
    title: "Zero Olympiad | Creating the Next Generation of Global Leaders",
    description: "Move beyond the traditional curriculum. Explore World Affairs, Diplomacy, and the 17 UN SDGs rebranded as 'Zero-' goals. Join the movement to represent Bangladesh on the global stage.",
    url: "https://www.zeroolympiad.com",
    siteName: "Zero Olympiad",
    images: [
      {
        url: "/SiteLogo.png",
        width: 600,
        height: 630,
        alt: "Zero Olympiad - Cultivating Global Leaders",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zero Olympiad | The Path to Becoming a Global Citizen",
    description: "Rebranding the 17 UN SDGs to create a world of Zero- challenges. Empowering students for the 2030 global agenda.",
    images: ["/SiteLogo.png"],
  },
};

import ConditionalLayout from './ConditionalLayout';
import SmoothScroll from "./Components/SmoothScroll";
import Providers from "./Providers";


export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexMono.variable} antialiased`}
      >

        <Providers>
          <ReduxProvider>
            <ConditionalLayout>
              <SmoothScroll>
                {children}
              </SmoothScroll>
            </ConditionalLayout>
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );


}