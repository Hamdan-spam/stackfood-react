import MainApi from '../../../api/MainApi'
import { useQuery } from 'react-query'

export const landingPagedata = async () => {
    const { data } = await MainApi.get('/api/v1/react-landing-page')
    return data
}
export const useGetLandingPageData = (onSuccessHandler) => {
    return useQuery('landing_page_data', () => landingPagedata(), {
        onSuccess: onSuccessHandler,
        enabled:false
    })
}
