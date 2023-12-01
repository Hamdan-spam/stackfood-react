import MainApi from '../../../api/MainApi'

export const WalletApi = {
    walletList: (offset, type) => {
        return MainApi.get(
            `/api/v1/customer/wallet/transactions?offset=${offset}&limit=10&type=${type}`
        )
    },
}
