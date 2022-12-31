import { AppDispatch } from "../Redux"
import { CreateMusicSlices } from "../Redux/Slices/CreateMusic.Slices"
import axios from '../utils/axios'

export const CreateMusicAxios = (data: any) => {
    return async (dispatch: AppDispatch) => {
        const response = await axios.post('track', data)
        dispatch(CreateMusicSlices.actions.fetchSuccess({
            name: data.name,
            artist: data.artist,
            text: data.text,
            audio: data.audio,
            picture: data.picture,
            id_artist: data.id_artist
        }))
        return response.data
    }
}