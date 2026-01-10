import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name: "user",
    initialState: {
        account: {
            accessToken: '',
            refreshToken: '',
            username: '',
            email: '',
            image: '',
            groupWithRole: ''
        },
        isAuthenticated: false
    },
    reducers: {
        FETCH_USER_LOGIN_SUCCESS: (state, action) => {
            state.account = {
                ...state.account,
                ...action.payload
            }
            state.isAuthenticated = true;

        },
        USER_LOGOUT_SUCCESS: (state) => {
            state.account = {
                accessToken: '',
                refreshToken: '',
                username: '',
                email: '',
                image: '',
                groupWithRole: ''
            }
            state.isAuthenticated = false
        },
        UPDATE_ACCOUNT: (state, action) => {
            state.account = {
                ...state.account,
                ...action.payload,   // merge nhiều key-value vào state.account
            };
        }
    },
});

export const { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS, UPDATE_ACCOUNT } = userReducer.actions;
export default userReducer.reducer;