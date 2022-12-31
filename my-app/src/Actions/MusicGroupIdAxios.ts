import { AppDispatch } from "../Redux"
import { IMusic } from "../Redux/Slices/Music.Slices"
import { MusicGroup, MusicGroupSlices } from "../Redux/Slices/MusicGroup.Slices"
import { MusicIdSlices } from "../Redux/Slices/MusicIdSlices"
import axios from '../utils/axios'

interface MusicIdAxios {
    music: MusicGroup
    musicsGroup: IMusic[]
}
export const MusicGroupIdAxios = (id: string | undefined) => {
    return async (dispatch: AppDispatch) => {
        dispatch(MusicIdSlices.actions.fetchLoading())
        const response = await axios.get<MusicIdAxios>(`music-sort/${id}`)
        dispatch(MusicIdSlices.actions.fetchSuccess({
            music: { 
                music: response.data.music,
                musicsGroup: response.data.musicsGroup
            }
        }))
    }
}