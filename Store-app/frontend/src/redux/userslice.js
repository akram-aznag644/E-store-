import {createSlice} from "@reduxjs/toolkit"
const intitialstate={
    user:{},
    token:"",
    role:"",
    
}
const user_slice=createSlice({
    name:"user",
    initialState:intitialstate,
    reducers:{
        store_user:(state,action)=>{
            state.user=action.payload.user;
            state.role=action.payload.role;
            state.token=action.payload.token;

        },
        delete_token:(state)=>{
            state.token=''
        }
    }
})
export const {store_user,delete_token}=user_slice.actions;
export default user_slice.reducer;