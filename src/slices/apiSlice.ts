import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "../types/apiResponse";
import { getAuth } from "firebase/auth";
import type { AppUser } from "../types/user";
import type {
  HistoryResult,
  HouseData,
  PredictionResult,
} from "../types/prediction";
import { VITE_SERVER_URL } from "../config/config";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_SERVER_URL,
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
  tagTypes: ["Predictions"],
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

    makePrediction: builder.mutation<ApiResponse<PredictionResult>, HouseData>({
      query: (houseData) => ({
        url: "/prediction",
        method: "POST",
        body: houseData,
      }),
      invalidatesTags: ["Predictions"],
    }),

    performMultiplePrediction: builder.mutation<
      ApiResponse<PredictionResult[]>,
      File
    >({
      query: (excelFile) => {
        const formData = new FormData();
        formData.append("excelFile", excelFile);

        return {
          url: "/prediction/multiple",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Predictions"],
    }),

    getPredictionById: builder.query<ApiResponse<PredictionResult>, number>({
      query: (id) => ({
        url: `/prediction/${id}`,
        method: "GET",
      }),
    }),

    getPredictionsByExcelId: builder.query<
      ApiResponse<PredictionResult[]>,
      number
    >({
      query: (excelId) => ({
        url: `/prediction/multiple/${excelId}`,
        method: "GET",
      }),
    }),

    getAllPredictions: builder.query<
      ApiResponse<HistoryResult>,
      { limit?: number }
    >({
      query: ({ limit }) => {
        const params = new URLSearchParams();

        if (limit) {
          params.append("limit", String(limit));
        }

        return {
          url: `/prediction?${String(params)}`,
          method: "GET",
        };
      },
      providesTags: ["Predictions"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLazyGetUserByIdQuery,
  useMakePredictionMutation,
  useLazyGetPredictionByIdQuery,
  useLazyGetPredictionsByExcelIdQuery,
  useGetAllPredictionsQuery,
  usePerformMultiplePredictionMutation,
} = api;
