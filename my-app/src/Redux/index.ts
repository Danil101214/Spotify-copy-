import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CreateMusicSort from "../Components/CreateMusicSort/CreateMusicSort";
import AddBanSlices from "./Slices/AddBan.Slices";
import CreateMusicSlices from "./Slices/CreateMusic.Slices";
import MusicSlices from "./Slices/Music.Slices";
import MusicGroupSlices from "./Slices/MusicGroup.Slices";
import MusicIdSlices from "./Slices/MusicIdSlices";
import { playerReducer } from "./Slices/PlayerReducer";
import UserFavoriteMusicSlices from "./Slices/UserFavoriteMusic";
import UsersSlices from "./Slices/Users.Slices";

const rootReducer = combineReducers({
    users: UsersSlices,
    track: MusicSlices,
    player: playerReducer,
    musicGroup: MusicGroupSlices,
    MusicId: MusicIdSlices,
    FavoriteMusic: UserFavoriteMusicSlices,
    AddBan: AddBanSlices,
    createMusic: CreateMusicSlices,
    //MusicSort: CreateMusicSort
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']