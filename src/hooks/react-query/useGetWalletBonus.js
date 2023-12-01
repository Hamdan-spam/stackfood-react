import { useQuery } from 'react-query'

import MainApi from '../../api/MainApi'

const getWalletBonus = async () => {
    const { data } = await MainApi.get('/api/v1/customer/wallet/bonuses')
    return data
}

export default function useWalletBonus() {
    return useQuery('wallet_bonus', getWalletBonus, {
        enabled: false,
    })
}
