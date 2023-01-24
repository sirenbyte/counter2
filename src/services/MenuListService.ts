import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { ResponceResult } from '../models/IResponseResult'
import { IUnknown } from '../models/IUnknown'

const URL = 'https://reqres.in/api/'

 export const MenuListApi = createApi({
    reducerPath: 'menuItemList',
    baseQuery:fetchBaseQuery({baseUrl: URL}),
    endpoints:(build)=>({
        fetchAllMenuItemList: build.query<ResponceResult<IUnknown[]>, number | string>({
             query: () => ({
                url : `unknown`
             })
        }),
        fetchMenuItem: build.query<ResponceResult<IUnknown>, number | string>({
         query: (id?) => ({
            url : `unknown/${id}`
         })
    }),
    })
 })