// src/app/page.tsx
'use client';

import React from 'react';
import AmortizationCalculator from '@/components/AmortizationCalculator';

export default function Home() {
  return (
    <main className="min-h-screen py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <AmortizationCalculator />
      </div>
    </main>
  );
}