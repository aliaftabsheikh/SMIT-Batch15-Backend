import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000" }),
    endpoints: (build)=>({
        getProducts: build.query({
            query: ()=> '/products/getAllProducts'
        }),
        addProduct : build.mutation({
            query : (newProduct)=>({
                url: '/products/addProduct',
                method: 'POST',
                body: newProduct
            })
        }),
        updateProduct: build.mutation({
            query: ({id, ...updatedFields}) => ({
                url : `/products/updateProduct/${id}`,
                method: 'PUT',
                body: updatedFields
            })
        })
    })
})

export const { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation } = productApi