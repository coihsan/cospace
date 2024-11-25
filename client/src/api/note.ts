import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const noteApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api"}),
    tagTypes: ['Notes'],
    endpoints: (builder) => ({
        getPrivateNotes : builder.query({
            query: () => '/notes/private',
            providesTags: ['Notes']
        }),
        addPrivateNotes: builder.mutation({
            query: (note) => ({
                url: '/notes/private',
                method: 'POST',
                body: note
            }),
            invalidatesTags: ['Notes']
        }),
        updatePrivateNotes: builder.mutation({
            query: (note) => ({
                url: `/notes/private/${note.id}`,
                method: 'PUT',
                body: note
            }),
            invalidatesTags: ['Notes']
        }),
        deletePrivateNotes: builder.mutation({
            query: (id) => ({
                url: `/notes/private/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Notes']
        }),
        getPublicNotes : builder.query({
            query: () => '/notes/public',
            providesTags: ['Notes']
        }),
    })
})

export const { 
    useGetPrivateNotesQuery, 
    useAddPrivateNotesMutation, 
    useDeletePrivateNotesMutation, 
    useGetPublicNotesQuery 
} = noteApi;