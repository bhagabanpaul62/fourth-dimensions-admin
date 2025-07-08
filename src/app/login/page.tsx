'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Admin login has been removed, redirecting to homepage.
    router.replace('/');
  }, [router]);

  return null;
}
