import React from 'react'
import useFetch from '../../../_hooks/useFetch';
import MySpinner from '../../../_components/MainLayout/MySpinner';
import { Link } from 'react-router-dom';

const NewArrival = () => {
  const { data, isLoading, isError } = useFetch(`products`);

  return (
    <div className='p-4 md:p-8 container mx-auto'>


      {
        isLoading ? <MySpinner />:
        <div className='grid lg:grid-cols-4 gap-5'>
          {data?.data?.map((prod=>(
            <Link to={`/product/${prod._id}`} key={prod._id} className='lg:w-[295px]'>
                <div className="img-div lg:h-[298px] mx-auto ">
                  <img src={prod.images[0]} className='w-full rounded-2xl object-cover h-full' alt="product image" />
                </div>

                <h3></h3>

                <h3> {prod.name} </h3>

                <h3> {prod.price} </h3>

            </Link>
          )))}
        </div>
      }
      

    </div>
  )
}

export default NewArrival