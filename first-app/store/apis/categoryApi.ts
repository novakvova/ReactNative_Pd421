// Need to use the React-specific entry point to import createApi
import {BaseQueryMeta, createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {ICategoryResponse} from "@/types/ICategoryResponse";
import {BASE_URL} from "@/constants/urls";
import {BaseQueryError} from "@reduxjs/toolkit/query";

// Define a service using a base URL and expected endpoints

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    tagTypes: ["Categories", "Category"],
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + '/api/categories' }),
    endpoints: (builder) => ({
        getCategories: builder.query<ICategoryResponse[], void>({
            query:() => '',
            transformResponse: (response: {data: ICategoryResponse}) => response.data,
            providesTags: ["Categories"]
        }),
        createCategory: builder.mutation<void, FormData>({
            query:(formData) => ({
                url: "",
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ["Categories","Category"]
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const { useGetCategoriesQuery, useCreateCategoryMutation } = categoryApi