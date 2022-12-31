import { AppDispatch } from "../Redux"
import { MusicGroup, MusicGroupSlices, MusicPayload } from "../Redux/Slices/MusicGroup.Slices"
import axios from '../utils/axios'

export const MusicGroupAxios = (count: number = 10, offset: number = 0) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(MusicGroupSlices.actions.fetchLoading())
            const response = await axios.get<MusicGroup[]>('music-sort', {params: {count, offset}})
            dispatch(MusicGroupSlices.actions.fetchSuccess({
                musicGroup: response.data
            }))
        } catch (error) {
            console.log(error)
        }
    }
}