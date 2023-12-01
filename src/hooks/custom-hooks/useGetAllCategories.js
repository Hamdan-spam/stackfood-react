import {useQuery} from "react-query";
import {CategoryApi} from "../react-query/config/categoryApi";
import {onErrorResponse} from "../../components/ErrorResponse";
import {useEffect} from "react";

export const useGetAllCategories = (searchKey)=>{
    const { isLoading, data, refetch } = useQuery(
        ['category'],
        () => CategoryApi.categories(searchKey),
        {
            onError: onErrorResponse,
        }
    )
    const handleApiCall = async ()=> await refetch()
    useEffect(()=>{
        handleApiCall()
    },[])
    return data?.data
}