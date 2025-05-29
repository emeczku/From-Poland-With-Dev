'use client';

import type React from 'react';
import ExchangeRateCard from './current-rate-card';
import CurrencyConverterHeader from './currency-converter-header';
import ExchangeForm from './exchange-form';

export default function CurrencyConverter() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <CurrencyConverterHeader />

        <ExchangeRateCard />

        <ExchangeForm />
      </div>
    </div>
  );
}

