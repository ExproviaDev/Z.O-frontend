"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, stopLoading } from "./store/slices/authSlice";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function AuthWrapper({ children }) {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      if (!user) {
        dispatch(fetchUserProfile(token));
      }
    } else {
      dispatch(stopLoading());
    }
  }, [dispatch, user]);

  return <>{children}</>;
}

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const routesToHideHeaderFooter = [
    "/admin",
    "/login",
    "/registration",
    "/dashboard",
  ];

  const shouldHideHeaderFooter = routesToHideHeaderFooter.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <AuthWrapper>
      {!shouldHideHeaderFooter && <Header />}
      <main className="min-h-screen mx-auto">{children}</main>
      {!shouldHideHeaderFooter && <Footer />}
    </AuthWrapper>
  );
}
