"use client";

import { ReactLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';

function SmoothScroll({ children }) {
  const pathname = usePathname();


  const isAdminPath = pathname.startsWith('/admin') || pathname.startsWith('/dashboard');

  if (isAdminPath) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.6, duration: 2 }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;