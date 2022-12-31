import AboutUs from "./Page/AboutUs/AboutUs"
import AddBan from "./Page/AddBan/AddBan"
import AddRolePageUsers from "./Page/AddRolePageUsers/AddRolePageUsers"
import { ABOUT_US, ADDBAN, ADDROLEUSER, CREATE_MUSIC, CREATE_MUSICSORT, LOGIN, MUISC_ID, MUSIC, MY_FAVORITE_MUSIC, REGISTRATION, SEARCHPAGE } from "./Page/Constants"
import CreateMusic from "./Page/CreateMusic/CreateMusic"
import Login from "./Page/Login/Login"
import Music from "./Page/Music/Music"
import MusicGroup from "./Page/MusicGroup/MusicGroup"
import MyFavoriteMusic from "./Page/MyFavoriteMusic/MyFavoriteMusic"
import Registration from "./Page/Registration/Registration"
import SearchPage from "./Page/SearchPage/SearchPage"

export const AuthRouter = [
    {
        path: MUSIC,
        element: <MusicGroup />
    },
    {
        path: MUISC_ID,
        element: <Music/>
    },
    {
        path: MY_FAVORITE_MUSIC,
        element: <MyFavoriteMusic />
    },
    {
        path: ADDBAN,
        element: <AddBan />
    },
    {
        path: CREATE_MUSIC,
        element: <CreateMusic />
    },
    {
        path: SEARCHPAGE,
        element: <SearchPage />
    },
    {
        path: ADDROLEUSER,
        element: <AddRolePageUsers />
    },
    {
        path: ABOUT_US,
        element: <AboutUs />
    }
]

export const PublicRouter = [
    {
        path: LOGIN,
        element: <Login />
    },
    {
        path: REGISTRATION,
        element: <Registration />
    },
    {
        path: MUSIC,
        element: <MusicGroup />
    },
    {
        path: MUISC_ID,
        element: <Music/>
    },
    {
        path: ABOUT_US,
        element: <AboutUs />
    }
]