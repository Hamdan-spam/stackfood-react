import { useQuery } from 'react-query'

import MainApi from '../../../api/MainApi'
import { onSingleErrorResponse } from '../../../components/ErrorResponse'

const getData = async (pageParams) => {
    const { id } = pageParams
    const { data } = await MainApi.get(
        `/api/v1/campaigns/basic-campaign-details?basic_campaign_id=${id}`
    )
    return data
}

export default function useGetBasicCampaignsDetails(pageParams) {
    return useQuery('basic-campaigns-details', () => getData(pageParams), {
        enabled: false,
        onError: onSingleErrorResponse,
    })
}
