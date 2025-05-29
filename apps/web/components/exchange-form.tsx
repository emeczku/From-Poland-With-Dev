'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function ExchangeForm() {
  const [amountEur, setAmountEur] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amountEur) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/exchange/convert', {
        amountEur: Number.parseFloat(amountEur)
      });
      setResult(res.data);
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 shadow-xl">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-100 mb-2">
            Convert Currency
          </h2>
          <p className="text-gray-400 text-sm">
            Enter the amount in EUR to convert to PLN
          </p>
        </div>

        <form onSubmit={handleConvert} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-200">
              Amount in EUR
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              value={amountEur}
              onChange={(e) => setAmountEur(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !amountEur}>
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Converting...</span>
              </div>
            ) : (
              'Convert to PLN'
            )}
          </button>
        </form>
      </div>

      {result && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">
            Conversion Result
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-400">EUR Amount</p>
              <p className="text-xl font-semibold text-white">
                €{result.amountEur.toFixed(2)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">PLN Amount</p>
              <p className="text-xl font-semibold text-green-400">
                {result.amountPln.toFixed(2)} zł
              </p>
            </div>
          </div>

          <div className="border-t border-gray-600 pt-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Exchange Rate:</span>
                <span className="text-gray-200">{result.rate.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Converted at:</span>
                <span className="text-gray-200">
                  {new Date(result.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

