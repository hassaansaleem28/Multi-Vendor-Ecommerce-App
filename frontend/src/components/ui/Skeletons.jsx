/**
 * Shimmer placeholders shown while product data is in flight. They mirror the
 * real card's dimensions so nothing jumps when the content lands.
 */

export function ProductCardSkeleton() {
  return (
    <div className="h-[400px] w-full rounded-2xl border border-ink-100 bg-white p-4">
      <div className="skeleton h-[180px] w-full rounded-xl" />
      <div className="skeleton mt-4 h-3 w-1/3 rounded-full" />
      <div className="skeleton mt-3 h-4 w-4/5 rounded-full" />
      <div className="skeleton mt-2 h-4 w-3/5 rounded-full" />
      <div className="skeleton mt-4 h-3 w-1/2 rounded-full" />
      <div className="mt-5 flex items-center justify-between">
        <div className="skeleton h-6 w-20 rounded-full" />
        <div className="skeleton h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 5 }) {
  return (
    <div className="mb-12 grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:gap-[25px] lg:grid-cols-4 xl:grid-cols-5 xl:gap-[30px]">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
