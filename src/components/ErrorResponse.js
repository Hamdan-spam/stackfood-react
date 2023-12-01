import { toast } from 'react-hot-toast'
import { logoutSuccessFull } from '../utils/ToasterMessages'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
import Router from 'next/router'

import { store } from '../redux/store'
import { removeToken } from '../redux/slices/userToken'
const handleTokenExpire = (status) => {
    if (status === 401) {
        if (window?.localStorage.getItem('token')) {
            toast.error(t('Your token has been expired. Please sign in again'))
            window?.localStorage.removeItem('token')
            store.dispatch(removeToken())
            Router.push('/home')
        }
    }
}

const handle404 = () => {
    toast.error(t('404 not found.'), {
        id: 'error',
    })
    Router.push('/404')
}

export const onErrorResponse = (error) => {
    error?.response?.data?.errors?.forEach((item) => {
        toast.error(item?.message)
    })
    handleTokenExpire(error?.response?.status)
}
export const onSingleErrorResponse = (error) => {
    if (error?.response?.status) {
        handle404()
    } else {
        toast.error(error?.response?.data?.message, {
            id: 'error',
        })
    }
    handleTokenExpire(error?.response?.status)
}
