import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
    'content-type': 'application/json',
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    'X-RapidAPI-Host': 'newsnow.p.rapidapi.com'
}

const baseUrl = 'https://newsnow.p.rapidapi.com/newsv2';

const today = new Date();
const month = today.getMonth();
today.setMonth(month - 1);


export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        headers: cryptoNewsHeaders,
    }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, newsCount }) => ({
                method: 'POST',
                url: '',
                body: JSON.stringify({
                    query: newsCategory,
                    time_bounded: true,
                    from_date: today.toLocaleDateString('en-IN'),
                    to_date: new Date().toLocaleDateString('en-IN'),
                    location: 'us',
                    language: 'en',
                    page: newsCount,
                }),
            })
        })
    })
})

export const {
    useGetCryptoNewsQuery
} = cryptoNewsApi;