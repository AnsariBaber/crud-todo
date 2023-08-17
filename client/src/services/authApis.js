import { api } from "../utils";

// Define a service using a base URL and expected endpoints
const authApis = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({ firstName, lastName, email, password }) => ({
        url: "/auth/register",
        method: "POST",
        body: { firstName, lastName, email, password },
      }),
    }),

    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    verifySecondaryEmail: builder.mutation({
      query: (email) => ({
        url: "/auth/secondaryEmailRegister",
        method: "POST",
        body: { secondaryEmail: email },
      }),
    }),

    getUser: builder.mutation({
      query: () => ({
        url: "/user/",
        method: "GET",
      }),
    }),
    getMessages: builder.mutation({
      query: () => ({
        url: "/user/messages",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useVerifySecondaryEmailMutation,
  useGetUserMutation,
  usePrefetch,
  useGetMessagesMutation,
} = authApis;
