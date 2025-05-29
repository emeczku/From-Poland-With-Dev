export default function CurrencyConverterHeader() {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
        <svg
          className="h-8 w-8 text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
        Currency Exchange
      </h1>
      <p className="text-gray-300">Convert EUR to PLN instantly</p>
    </div>
  );
}
