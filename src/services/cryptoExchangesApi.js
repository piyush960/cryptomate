import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const cryptoApiHeaders = {
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    'X-RapidAPI-Host': 'coinpaprika1.p.rapidapi.com'
}

const baseUrl = 'https://coinpaprika1.p.rapidapi.com';

export const cryptoExchangesApi = createApi({
    reducerPath: 'cryptoExchangesApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl,
        headers: cryptoApiHeaders,
    }),
    endpoints: (builder) => ({
        getExchanges: builder.query({
            query: () => (`/exchanges`)
        }),
    })

})

export const {
    useGetExchangesQuery
} = cryptoExchangesApi;