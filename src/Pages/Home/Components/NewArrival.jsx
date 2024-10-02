import React from 'react'
import useFetch from '../../../_hooks/useFetch';

const NewArrival = () => {
  const { data, isLoading, isError } = useFetch(`products`);

  return (
    <div>NewArrival</div>
  )
}

export default NewArrival