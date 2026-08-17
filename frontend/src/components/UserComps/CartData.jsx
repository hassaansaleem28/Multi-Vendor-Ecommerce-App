/**
 * Standalone order-summary card. Currently unused — Checkout and Payment each
 * render their own local CartData — kept here in the app's visual language so
 * it drops in cleanly if it's ever wired up.
 */
function CartData({ orderData }) {
  const shipping = orderData?.shipping?.toFixed(2);

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-6">
      <h3 className="font-display text-[18px] font-bold text-ink-900">
        Order summary
      </h3>

      <dl className="mt-6 space-y-3.5">
        <div className="flex items-center justify-between">
          <dt className="text-[14px] text-ink-500">Subtotal</dt>
          <dd className="font-display text-[15px] font-semibold text-ink-900">
            ${orderData?.subTotalPrice}
          </dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-[14px] text-ink-500">Shipping</dt>
          <dd className="font-display text-[15px] font-semibold text-ink-900">
            ${shipping}
          </dd>
        </div>

        <div className="flex items-center justify-between border-b border-ink-100 pb-4">
          <dt className="text-[14px] text-ink-500">Discount</dt>
          <dd
            className={`font-display text-[15px] font-semibold ${
              orderData?.discountPrice ? "text-success-600" : "text-ink-400"
            }`}
          >
            {orderData?.discountPrice ? `−$${orderData.discountPrice}` : "—"}
          </dd>
        </div>

        <div className="flex items-center justify-between pt-1">
          <dt className="font-display text-[16px] font-bold text-ink-900">
            Total
          </dt>
          <dd className="font-display text-[26px] font-extrabold text-ink-900">
            ${orderData?.totalPrice}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default CartData;
