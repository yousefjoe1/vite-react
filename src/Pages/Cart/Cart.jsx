import React from 'react';

const Cart = () => {
  const subtotal = 565;
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-bold mb-4">Order Summary</h2>

      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-bold">${subtotal}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Discount (-20%)</span>
        <span className="font-bold text-red-500">-${discount.toFixed(0)}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Delivery Fee</span>
        <span className="font-bold">${deliveryFee}</span>
      </div>

      <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
        <span>Total</span>
        <span>${total.toFixed(0)}</span>
</div>
<button className="w-full mt-4 p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all">
        Go to Checkout →
      </button>
    </div>
  );
};

export default  Cart;