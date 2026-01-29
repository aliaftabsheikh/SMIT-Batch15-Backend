import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/auth",
        credentials: 'include'
    }),
    endpoints: (build)=>({
      loginUser: build.mutation({
        query: (credentials)=>({
            url: '/login',
            method: 'POST',
            body: credentials
      })
    }),

    signUpUser : build.mutation({
        query : (newUser)=>({
            url: '/signup',
            method: 'POST',
            body: newUser
        })
    })
})
})

export const {useLoginUserMutation, useSignUpUserMutation} = authApi