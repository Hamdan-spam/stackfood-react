import React from 'react'
import Profile from '../profile/Profile'
import ProfilePage from '../profile/ProfilePage'
import WalletsPage from '../wallets/WalletsPage'
import Wallet from '../wallets/WalletList'
import CouponList from '../coupon/CouponList'
import LoyalityList from '../loyality/LoyalityList'
import ReferCodePage from '../refer-code/ReferCodePage'
import Settings from '../settings/Settings'
import SettingPage from '../settings/SettingPage'
import OrderHistoryPage from '../../order-history/OrderHistoryPage'
import { Scrollbar } from '../../Scrollbar'
import Chat from '../../chat/Chat'
import WishlistPage from '../../wishlist-page/WishlistPage'
import { Stack } from '@mui/system'
import { RTL } from '../../RTL/RTL'
import { useSelector } from 'react-redux'

const ProfileBody = ({ page }) => {
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }

    const activeComponent = () => {
        if (page === 'profile') {
            return <ProfilePage />
        }
        if (
            page === 'wallets' ||
            page === 'wallets?flag=success' ||
            page === 'wallets?flag=cancel'
        ) {
            return <Wallet page={page} />
        }
        if (page === 'coupons') {
            return <CouponList />
        }
        if (page === 'loyalty') {
            return <LoyalityList />
        }
        if (page === 'referral') {
            return <ReferCodePage />
        }
        if (page === 'settings') {
            return <SettingPage />
        }
        if (page === 'order') {
            return <OrderHistoryPage />
        }
        if (page === 'inbox') {
            return <Chat />
        }
        if (page === 'wishlist') {
            return <WishlistPage />
        }
    }

    return <RTL direction={languageDirection}>{activeComponent()}</RTL>
}

export default ProfileBody
