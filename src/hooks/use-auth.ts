import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAppSelector } from './redux'
import { checkAuth, setUser } from "../store/reducers/UserSlice";
import { useAppDispatch } from "../hooks/redux";
function useAuth() {
   
    const {email, token} = useAppSelector(state=>state.LoginReducer)
    
    
    return {
        isAuth: !!email ,
        email,
        token
    }
  
}

export default useAuth