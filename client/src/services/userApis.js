import { api } from "../utils";

// Define a service using a base URL and expected endpoints
const userApis = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["user", "vault"],
    }),

    addNewMessage: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
    }),
    deleteMessage: builder.mutation({
      query: (data) => ({
        url: "/user/deleteMessage",
        method: "POST",
        body: data,
      }),
    }),
    updateMessage: builder.mutation({
      query: (data) => ({
        url: "/user/updateMessage",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useAddNewMessageMutation,
  useDeleteMessageMutation,
  useUpdateMessageMutation,
} = userApis;
