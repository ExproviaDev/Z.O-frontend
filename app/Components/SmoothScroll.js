"use client";

import { ReactLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';

function SmoothScroll({ children }) {
  const pathname = usePathname();

  // যদি ইউআরএল /admin দিয়ে শুরু হয়, তবে লেনিস কাজ করবে না
  const isAdminPath = pathname.startsWith('/admin') || pathname.startsWith('/dashboard');

  if (isAdminPath) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 2 }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;