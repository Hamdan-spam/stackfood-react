import MainApi from '../../../../api/MainApi'
import { useQuery } from 'react-query'
import { onErrorResponse } from '../../../../components/ErrorResponse'

const getData = async (type) => {
    const { data } = await MainApi.get(
        `/api/v1/customer/message/list?type=${type}`
    )
    return data
}
export const useGetChannelList = (type, handleRequestOnSuccess) => {
    return useQuery('get_channel_list', () => getData(type), {
        enabled: false,
        onSuccess: handleRequestOnSuccess,
        onError: onErrorResponse,
    })
}
