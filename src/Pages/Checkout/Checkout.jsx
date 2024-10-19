import React from 'react'
import ContainerUp from '../../_components/ContainerUp'

const Checkout = () => {
  return (
    <ContainerUp className='min-h-screen container mx-auto'>

      <div className="flex justify-between pt-10">

        <div className="left-section w-1/2">

          <div className="login flex-wrap flex justify-between items-center border-2 rounded-2xl shadow-sm p-3">
              <div className="l flex gap-10 flex-wrap">
                <span className='w-6 h-6 border-2 rounded-full flex justify-center items-center'>a</span>

                <div >
                  <h3>Login</h3>
                  <h3 className="font-bold">Youssef Mahmoud +92749382749823</h3>
                </div>
              </div>


              <div className="r bg-slate-200 p-1 px-2 rounded-lg">
                  Change
              </div>
          </div>

          <div className="login flex-wrap flex justify-between items-center border-2 rounded-2xl shadow-sm p-3 mt-3">
              <div className="l flex gap-10 flex-wrap">
                <span className='w-6 h-6 border-2 rounded-full flex justify-center items-center'>b</span>

                <div >
                  <h3>Shipping Address</h3>
                  <h3 className="font-bold">Egypt,mansoura</h3>
                </div>
              </div>


              <div className="r bg-slate-200 p-1 px-2 rounded-lg">
                  Change
              </div>
          </div>

          <div className="bg-slate-100 p-3 rounded-2xl flex gap-10 items-center mt-3">
          <span className='w-6 h-6 text-white rounded-full bg-slate-900 flex justify-center items-center'>b</span>
          <span>Payment Method</span>
          </div>

        </div>
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>$200</span>
            </div>
            <div className="flex justify-between mb-2 text-red-500">
              <span>Discount (-10%)</span>
              <span>-$120</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Fee</span>
              <span>$15</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
              <span>Total</span>
              <span>$110</span>
            </div>
            <div to={`/checkout`} className="w-full block text-center bg-black text-white py-3 rounded-full mt-6 hover:bg-gray-800 transition duration-300">
            Place Order
            </div>
          </div>
        </div>


      </div>
      
    </ContainerUp>
  )
}

export default Checkout