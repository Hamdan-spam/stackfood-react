import { useMutation } from 'react-query'

import MainApi from '../../api/MainApi'

const getAddFund = async (formData) => {
    const { data } = await MainApi.post(
        '/api/v1/customer/wallet/add-fund',
        formData
    )
    return data
}
export const useAddFundToWallet = () => {
    return useMutation('add-fund-to-wallet', getAddFund)
}
