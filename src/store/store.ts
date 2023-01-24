import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import LayoutReducer from './reducers/LayoutSlice'
import { MenuListApi } from "../services/MenuListService"
import { UsersApi } from "../services/UserListService"
import LoginReducer from './reducers/UserSlice'
const rootReducer = combineReducers({
    LayoutReducer,
    LoginReducer,
     [MenuListApi.reducerPath] : MenuListApi.reducer,
     [UsersApi.reducerPath] : UsersApi.reducer
})


export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware:(getDefaultMiddleware) => getDefaultMiddleware()
        .concat(MenuListApi.middleware)
        .concat(UsersApi.middleware),
        
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']