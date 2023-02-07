import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const contactsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
  }),
  tagTypes: ['contacts'],
  endpoints: builder => ({
    getAllContacts: builder.query({
      query: () => ({
        url: '/contacts',
      }),
      providesTags: ['contacts'],
    }),
    // getContactById: builder.query({
    //   query: id => ({
    //     url: `/contacts/${id}`,
    //   }),
    // }),
    addContact: builder.mutation({
      query: contact => ({
        url: '/contacts',
        method: 'POST',
        data: contact,
      }),
      invalidatesTags: ['contacts'],
    }),
    deleteContact: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['contacts'],
    }),
    editContact: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/contacts/${id}`,
          method: 'PATCH',
          data,
        };
      },
      invalidatesTags: ['contacts'],
    }),
    // ToggleFavorite: builder.mutation({
    //   query: data => {
    //     const { id, favorite } = data;
    //     return {
    //       url: `/contacts/${id}`,
    //       method: 'PATCH',
    //       data: { favorite },
    //     };
    //   },
    //   invalidatesTags: ['contacts'],
    // }),
  }),
});

export const {
  useGetAllContactsQuery,
  // useGetContactByIdQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useEditContactMutation,
  // useToggleFavoriteMutation,
} = contactsApi;
