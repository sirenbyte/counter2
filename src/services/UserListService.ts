import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { ResponceResult } from '../models/IResponseResult'
import { IUnknown } from '../models/IUnknown'
import { IUsers } from '../models/IUsers'

const URL = 'https://reqres.in/api/'

 export const UsersApi = createApi({
    reducerPath: 'users',
    baseQuery:fetchBaseQuery({baseUrl: URL}),
    endpoints:(build)=>({
        fetchAllUserList: build.query<ResponceResult<IUsers[]>, number>({
             query: (pageNum) => ({
                url : `users?page=${pageNum}`
             })
        }),
        fetchUser: build.query<ResponceResult<IUsers>, any>({
         query: (id) => ({
            url : `users/${id}`
         })
    }),
    })
 })