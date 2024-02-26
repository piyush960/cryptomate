import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from '../services/cryptoApi.js';
import { cryptoNewsApi } from '../services/cryptoNewsApi.js';
import { cryptoExchangesApi } from '../services/cryptoExchangesApi.js';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
        [cryptoExchangesApi.reducerPath]: cryptoExchangesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([ cryptoApi.middleware, cryptoNewsApi.middleware, cryptoExchangesApi.middleware ]),

});