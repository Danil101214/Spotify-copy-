import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {IMusic} from '../Slices/Music.Slices'


interface FavoriteMusicPayload {
    favoriteMusic: IMusic[]
}

interface FavoriteInitialMusic {
    loading: boolean
    favoriteMusic: IMusic[]
    error: boolean
}

const initialState:FavoriteInitialMusic = {
    loading: false,
    favoriteMusic: [],
    error: false
}

export const UserFavoriteMusicSlices = createSlice({
    name: 'UserFavoriteMusic',
    initialState,
    reducers: {
        fetchLoading: (state) => {
            state.loading = true
        },
        fetchSuccess: (state, action: PayloadAction<FavoriteMusicPayload>) => {
            state.loading = false
            state.favoriteMusic = action.payload.favoriteMusic
        },
        fetchError: (state) => {
            state.loading = true
            state.error = true
        }
    }
})

export default UserFavoriteMusicSlices.reducer