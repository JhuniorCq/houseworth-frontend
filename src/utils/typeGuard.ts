// Función de guardia para que TS sepa si la respuesta es ApiSuccessResponse<T> o si es ApiErrorResponse

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type {
  ApiErrorResponse,
  ApiResponse,
  ApiSuccessResponse,
} from "../types/apiResponse";

export const isFetchBaseQueryError = (
  error: unknown
): error is FetchBaseQueryError & { data: ApiErrorResponse } => {
  return typeof error === "object" && error !== null && "data" in error;
};

export const isApiSuccessResponse = <T>(
  response: ApiResponse<T>
): response is ApiSuccessResponse<T> => {
  return response.success;
};
