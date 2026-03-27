'use client';

import { Suspense } from 'react';
import { ClientPage } from './ClientPage';

function LoadingFallback() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center text-gray-500">加载中...</div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ClientPage />
    </Suspense>
  );
}
