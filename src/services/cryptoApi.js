import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const cryptoApiHeaders = {
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com/';

// const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl,
        headers: cryptoApiHeaders,
        // prepareHeaders: (headers) => {
        //     headers.set('X-RapidAPI-Key', import.meta.env.VITE_API_KEY);
        //     headers.set('X-RapidAPI-Host', 'coinranking1.p.rapidapi.com');

        //     return headers;
        // },
    }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => (`/coins/?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: ( coinId ) => (`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod }) => (`/coin/${coinId}/history?timePeriod=${timePeriod}`)
        })
    })

})

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} = cryptoApi;