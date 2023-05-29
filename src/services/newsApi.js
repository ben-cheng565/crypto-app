import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsApiHeaders = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Host": process.env.API_HOST,
  "X-RapidAPI-Key": process.env.API_KEY,
};

const baseUrl = process.env.BASE_URL;
const createRequest = (url) => ({ url, headers: newsApiHeaders });

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ category, count }) =>
        createRequest(
          `/search?q=${category}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
