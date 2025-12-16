// app/ConditionalLayout.jsx (আপডেট করা কোড)

"use client";

import { usePathname } from 'next/navigation';
import Header from "./Components/Header/Header"; 
import Footer from "./Components/Footer/Footer"; 
import ReduxProvider from "./store/ReduxProvider"; 
import Timeline from './Components/Timeline/TimelineEvent';

export default function ConditionalLayout({ children }) {
    const pathname = usePathname();
    const routesToHideHeaderFooter = [
        '/admin',      
        '/login',      
        '/registration'
    ];
    const shouldHideHeaderFooter = routesToHideHeaderFooter.some(route => 
        pathname.startsWith(route)
    );

    return (
        <>
            {!shouldHideHeaderFooter && <Header />}

            <main className="min-h-screen mx-auto ">
                <ReduxProvider>
                    {children}
                    <Timeline></Timeline>
                </ReduxProvider>
            </main>
            {!shouldHideHeaderFooter && <Footer />}
        </>
    );
}