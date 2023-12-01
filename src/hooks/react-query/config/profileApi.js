import MainApi from '../../../api/MainApi';
import { getToken } from "../../../components/checkout-page/functions/getGuestUserId";

export const ProfileApi = {
    profileInfo: () => {
        const token=getToken()
        if (token) {
            return MainApi.get('/api/v1/customer/info');
        }
    },
    profileUpdate: (profileData) =>
      MainApi.post('/api/v1/customer/update-profile', profileData),
};
