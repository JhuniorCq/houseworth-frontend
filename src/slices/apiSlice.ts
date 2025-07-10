import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../utils/constants";
import type { ApiResponse } from "../types/apiResponse";
import { getAuth } from "firebase/auth";
import type { AppUser } from "../types/user";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: async (headers) => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        const token = await currentUser.getIdToken();
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      ApiResponse<void>,
      { uid: string; username: string; email: string; password: string }
    >({
      query: ({ uid, username, email, password }) => ({
        url: "/user/sign-up",
        method: "POST",
        body: {
          uid,
          username,
          email,
          password,
        },
      }),
    }),

    // Dato: No es necesario incluir el email y password en el body si ya estás autenticado con Firebase. Normalmente solo se envía el idToken, y el backend lo valida y extrae el UID/email desde el propio token.
    loginUser: builder.mutation<
      ApiResponse<{ uid: string; username: string; email: string }>,
      void
    >({
      query: () => ({
        url: "/user/login",
        method: "POST",
        body: {},
      }),
    }),

    getUserById: builder.query<ApiResponse<AppUser>, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),

    makePrediction: builder.mutation<
      ApiResponse<any>,
      {
        overallQual: number;
        neighborhood: string;
        grLivArea: number;
        garageCars: number;
        totalBsmtSF: number;
        yearBuilt: number;
      }
    >({
      query: (houseData) => ({
        url: "/prediction",
        method: "POST",
        body: houseData,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLazyGetUserByIdQuery,
} = api;
