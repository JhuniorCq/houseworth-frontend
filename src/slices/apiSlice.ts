import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../utils/constants";
import type { ApiResponse } from "../types/apiResponse";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
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
      {
        idToken: string;
      }
    >({
      query: ({ idToken }) => ({
        url: "/user/login",
        method: "POST",
        body: {},
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = api;
