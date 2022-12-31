import { AppDispatch } from "../Redux"
import { IMusic } from "../Redux/Slices/Music.Slices"
import { UserFavoriteMusicSlices } from "../Redux/Slices/UserFavoriteMusic"
import axios from '../utils/axios'

export const FavoriteMusicAxios = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(UserFavoriteMusicSlices.actions.fetchLoading())
            const response = await axios.get<IMusic[]>('auth/my/profile')
            dispatch(UserFavoriteMusicSlices.actions.fetchSuccess({
                favoriteMusic: response.data
            }))
        } catch (error) {
            console.log(error)
        }
    }
}