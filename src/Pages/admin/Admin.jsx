import React from 'react'
import useFetch from '../../_hooks/useFetch'
import MySpinner from '../../_components/MainLayout/MySpinner';
import UpdateProduct from './components/UpdateProduct';
import AddProduct from './components/AddProduct';

const Admin = () => {
  const { data, isLoading, isError,refetch } = useFetch(`products`,'pr-admin');
console.log(data);

  if(isLoading || isError){

    return <><MySpinner /></>
  }
    
  return (
    <div className='p-5 container mx-auto'>
      <AddProduct refetch={refetch} />

    <div className="grid grid-cols-1 gap-10">
      {
        data?.data?.map(el=>(
          <div key={el._id} className='bg-slate-200 rounded-2xl shadow-lg p-4'>
              <div className="imgs flex justify-center gap-5">
                <img width={200} className='object-cover' loading='lazy' src={el.images[0]} alt={el.images[0]} />
                <img width={200} className='object-cover' loading='lazy' src={el.images[1]} alt={el.images[1]} />
                <img width={200} className='object-cover' loading='lazy' src={el.images[2]} alt={el.images[2]} />
              </div>

              <div className="name">name: {el.name} </div>
              <div className="name">price: {el.price} </div>
              <div className="name">category: {el.category} </div>
              <div className="name">dress: {el.dress} </div>
              <div className="name">rate: {el.rate} </div>

              {/* update */}
              <UpdateProduct product={el} refetch={refetch} />
          </div>
        ))
      }
    </div>

        
    </div>
  )
}

export default Admin