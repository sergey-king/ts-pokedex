import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Pokemon } from 'pokenode-ts';
import { RootState } from '../store';

export type SearchRecord = {
  searchId: string;
  searchValue: string;
  searchResult: Pokemon;
}

export interface SearchHistory {
  searchValues: SearchRecord[];
}

const initialState: SearchHistory = {
  searchValues: [],
};

// NOTE: whateaver you're accessing history items you're not making any extra API calls as the data is already in the store.
export const searchHistorySlice = createSlice({
  name: 'searchHistorySlice',
  initialState,
  reducers: {
    addSearchValue: (state, action: PayloadAction<SearchRecord>) => {
      state.searchValues.push(action.payload);
      return state;
    },
    clearSearchValues: state => {
      state.searchValues = [];
      return state;
    },
  }
});

export const selectSearchHistory = (state: RootState) => state.searchHistory.searchValues;

export const {
  addSearchValue,
  clearSearchValues,
} = searchHistorySlice.actions;

export default searchHistorySlice.reducer;
