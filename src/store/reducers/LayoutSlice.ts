import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface LayoutState {
    isMobileOpen:boolean
}

const initialState : LayoutState= {
    isMobileOpen:false
} 

export const layoutSlice = createSlice({
    name:'layout',
    initialState, 
    reducers:{ // switch case
        handleDrawerToggle(state, action:PayloadAction<boolean>){
             state.isMobileOpen = !action.payload
        }
    }

})

export default layoutSlice.reducer;
