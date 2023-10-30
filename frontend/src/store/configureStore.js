import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer.js';

export default function () {
    return configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
            // Nothing to concat for now. List additional middlewares here
        )
    });
} 