import MainApi from '../../../../api/MainApi'
import { useMutation } from 'react-query'
import { onSingleErrorResponse } from '../../../../components/ErrorResponse'

const resetPassword = async (newPass) => {
    const { data } = await MainApi.put('/api/v1/auth/reset-password', newPass)
    return data
}
export const useResetPassword = (onSuccessHandlerForReset, onErrorResponse) => {
    return useMutation('reset_password', resetPassword, {
        onSuccess: onSuccessHandlerForReset,
        onError: onSingleErrorResponse,
    })
}
