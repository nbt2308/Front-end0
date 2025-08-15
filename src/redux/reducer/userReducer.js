import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name: "user",
    initialState: {
        account: {
            access_token: '',
            refresh_token: '',
            username: '',
            image: '',
            role: ''
        },
        isAuthenticated: false
    },
    reducers: {
        FETCH_USER_LOGIN_SUCCESS: (state, action) => {
            

            state.account = {
                ...state.account,
                ...action.payload
            }
            state.isAuthenticated=true;
            
        },
        decrement: (state) => {
            state.count -= 1;
        },
    },
});

export const { FETCH_USER_LOGIN_SUCCESS , decrement } = userReducer.actions;
export default userReducer.reducer;