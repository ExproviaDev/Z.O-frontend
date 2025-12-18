"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserProfile, stopLoading } from './store/slices/authSlice';
import Header from "./Components/Header/Header"; 
import Footer from "./Components/Footer/Footer"; 
import ReduxProvider from "./store/ReduxProvider"; 

// ডাটা লোড করার জন্য আলাদা কম্পোনেন্ট (যাতে useDispatch ব্যবহার করা যায়)
function AuthWrapper({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            dispatch(fetchUserProfile(token));
        } else {
            dispatch(stopLoading());
        }
    }, [dispatch]);

    return <>{children}</>;
}

export default function ConditionalLayout({ children }) {
    const pathname = usePathname();
    const routesToHideHeaderFooter = ['/admin', '/login', '/registration'];
    
    const shouldHideHeaderFooter = routesToHideHeaderFooter.some(route => 
        pathname.startsWith(route)
    );

    return (
        <ReduxProvider> {/* ✅ সবার উপরে Provider থাকবে */}
            <AuthWrapper>
                {/* ✅ এখন Header প্রোভাইডারের ভেতরে, তাই useSelector কাজ করবে */}
                {!shouldHideHeaderFooter && <Header />}

                <main className="min-h-screen mx-auto">
                    {children}
                </main>

                {!shouldHideHeaderFooter && <Footer />}
            </AuthWrapper>
        </ReduxProvider>
    );
}