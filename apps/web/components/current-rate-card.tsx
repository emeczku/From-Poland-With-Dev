'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function CurrentRateCard() {
  const [rate, setRate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get('http://localhost:3001/exchange/rate')
      .then((res) => {
        setRate(res.data.rate);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching exchange rate:', error);
        setRate(null);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="h-5 w-5 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
        <h2 className="text-xl font-semibold text-white">
          Current Exchange Rate
        </h2>
      </div>

      {isLoading ? (
        <p className="text-gray-400 text-lg">Loading rate...</p>
      ) : rate ? (
        <p className="text-gray-300 text-lg">1 EUR = {rate.toFixed(2)} PLN</p>
      ) : (
        <p className="text-red-400 text-lg">Error fetching rate</p>
      )}
    </div>
  );
}

