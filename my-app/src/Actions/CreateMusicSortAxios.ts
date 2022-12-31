import { AppDispatch } from "../Redux"
import { CreateMusicSortSlices, ICreateMusic } from "../Redux/Slices/CreateMusicSort.Slices"
import axios from '../utils/axios'

export const CreateMusicSortAxios = (data: any) => {
    return async (dispatch: AppDispatch) => {
        const response = await axios.post('music-sort', data)
        dispatch(CreateMusicSortSlices.actions.fetchSuccess({
            artist: data.artist,
            description: data.description,
            picture: data.picture
        }))
        console.log(response.data)
    }
}