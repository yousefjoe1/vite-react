import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { getData } from '../_functions/getData';
// isAuth,isEnable
const useFetch = (url, apiName, fetchAgain,isPaginate,) => {
// console.log(url);
// * url , apiName , fetchAgain , isPaginate , isAuth , isEnable
    let { data, isLoading, isRefetching, isError,refetch } = useQuery({
        queryKey: [apiName, fetchAgain],
        queryFn: () => {
                return getData(url)
        },
        refetchOnWindowFocus: false,
        // enabled: isEnable
    });

    // console.log(isError);


    return {data, isLoading, isRefetching, isError,refetch }
}

export default useFetch