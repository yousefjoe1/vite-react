import React from 'react'
import ContainerUp from '../../_components/ContainerUp'

const Checkout = () => {
  return (
    <ContainerUp className='min-h-screen container mx-auto'>

      <div className="flex pt-10">

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


      </div>
      
    </ContainerUp>
  )
}

export default Checkout