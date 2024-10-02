import React from 'react'
import useFetch from '../../../_hooks/useFetch';
import MySpinner from '../../../_components/MainLayout/MySpinner';
import Product from '../../../_components/Cards/Product';

const NewArrival = () => {
  const { data, isLoading, isError } = useFetch(`products`);

  return (
    <div className='p-4 md:p-8 container mx-auto'>


      {
        isLoading ? <MySpinner />:
        <div className='grid lg:grid-cols-4 gap-5'>
          {data?.data?.map((prod=>(
              <Product prod={prod} key={prod._id} />
          )))}
        </div>
      }
      

    </div>
  )
}

export default NewArrival