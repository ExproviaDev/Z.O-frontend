"use client";

import { ReactLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';

function SmoothScroll({ children }) {
  const pathname = usePathname();

  const isAdminPath = pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard');

  if (isAdminPath) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.9, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;