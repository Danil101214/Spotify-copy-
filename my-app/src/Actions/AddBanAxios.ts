import { AppDispatch } from "../Redux"
import AddBanSlices, {addBan} from "../Redux/Slices/AddBan.Slices"
import axios from '../utils/axios'

export const AddBanAxios = (data: any) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.post('auth/ban', data)
            dispatch(addBan.actions.fetchSuccess({
                ban: data.ban,
                ban_description: data.ban_description,
                id_user: data.id_user
                
            }))
        } catch (error) {
            console.log(error)
        }
    }
}