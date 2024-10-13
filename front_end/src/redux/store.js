import {configureStore} from '@reduxjs/toolkit'
import userAuthorSlice from './Slices/userAuthorSlice'

export const store =configureStore({
    reducer:{
        userAuthor:userAuthorSlice
    }
})

