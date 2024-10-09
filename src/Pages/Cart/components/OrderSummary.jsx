import React from 'react'

const OrderSummary = ({data,cartDetails}) => {
    let {total} = cartDetails;
    
  return (
    <div className="w-full lg:w-1/3">
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>$100</span>
      </div>
      <div className="flex justify-between mb-2 text-red-500">
        <span>Discount (-20%)</span>
        <span>-$100</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Delivery Fee</span>
        <span>$15</span>
      </div>
      <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
        <span>Total</span>
        <span>${total}</span>
      </div>
      <button className="w-full bg-black text-white py-3 rounded-full mt-6 hover:bg-gray-800 transition duration-300">
        Go to Checkout →
      </button>
    </div>
  </div>
  )
}

export default OrderSummary