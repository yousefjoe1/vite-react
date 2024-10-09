import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { getData, getDataWithAuth } from '../_functions/getData';
// isAuth,isEnable
const useFetch = (url, apiName, fetchAgain,auth = '') => {
// console.log(url);
// * url , apiName , fetchAgain , isPaginate , isAuth , isEnable
    let { data, isLoading, isRefetching, isError,refetch ,error,isFetched} = useQuery({
        queryKey: [apiName, fetchAgain],
        queryFn: () => {
            if(auth.length > 0){

                return getDataWithAuth(url,auth)
            }else {
                return getData(url)
            }
        },
        refetchOnWindowFocus: false,
        // enabled: isEnable
    });

    // console.log(isError);


    return {data, isLoading, isRefetching, isError,refetch, error , isFetched}
}

export default useFetch