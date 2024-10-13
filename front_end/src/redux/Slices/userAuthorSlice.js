import { createSlice, isPending } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//http request
export const userLogin = createAsyncThunk('user-author-login', async (userObj, thunkApi) => {
    try {
        let res;
        if (userObj.userType === 'user') {
            res = await axios.post('http://localhost:4000/user-api/Login', userObj);
        } else {
            res = await axios.post('http://localhost:4000/author-api/Login', userObj);
        }

        if (res.data.message === 'User has Logined' || res.data.message === 'author has Logined') {
            // Store token in local/session storage
            localStorage.setItem('token', res.data.token);
            // Return the data to be used in the fulfilled case
            return res.data; // <-- Return the full response data
        } else {
            // If login failed, reject with the error message
            return thunkApi.rejectWithValue(res.data.message);
        }
    } catch (error) {
        return thunkApi.rejectWithValue(error.response ? error.response.data.message : error.message);
    }
});


export const userAuthorSlice=createSlice({
    name:"user-author-Login",
    initialState:{
        isPending:false,
        userlogin:false,
        currentdata:{},
        errMsg:'',
        errorOcurence:false
    },
    reducers:{
        resetState:(state,action)=>{
        state.isPending =false
        state.userlogin=false
        state.currentdata={}
        state.errMsg=''
        state.errorOcurence=false
        }
    },
    extraReducers: builder=>
        builder
    .addCase(userLogin.pending,(state,action)=>{
        state.isPending=true
    })
    .addCase(userLogin.fulfilled, (state, action) => {
        state.currentdata = action.payload;  // Make sure the full payload is set
        state.isPending = false;
        state.userlogin = true;
        state.errMsg = '';
        state.errorOcurence = false;
      })
      
    .addCase(userLogin.rejected,(state,action)=>{
        state.currentdata={}
        state.isPending =false
        state.userlogin=false
        state.errMsg=action.payload
        state.errorOcurence=true
    })
})

//export action creator function
export default userAuthorSlice.reducer

//export root reducers of the slices
export const {resetState}=userAuthorSlice.actions