import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from "../app/Constants";

export const productsAPI = createApi({
    reducerPath: "productsAPI",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        authUser: builder.query({
            query: () => ({
                url: '/users',
                method: 'GET'
            })
        }),
        getProducts: builder.query({
            query: () => ({
                url: '/products',
                method: 'GET'
            })
        }),
        addProduct: builder.mutation({
            query: (newProduct) => ({
                url: '/products',
                method: 'POST',
                body: newProduct
            })
        })
    })
})

export const {
    useAuthUserQuery,
    useGetProductsQuery,
    useAddProductMutation
} = productsAPI;