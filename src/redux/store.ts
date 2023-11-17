import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonApi } from './slices/api';
import { appSettingsSlice } from './slices/device';
import { searchHistorySlice } from './slices/searchHistory';

const combinedReducer = combineReducers({
    appSettings: appSettingsSlice.reducer,
    searchHistory: searchHistorySlice.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer
  });

// Main redux store
export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;