import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ColorSchemeName } from 'react-native';
import { RootState } from '../store';

export interface Theme {
  theme: ColorSchemeName;
}

const initialState: Theme = {
  theme: "dark",
};

// NOTE: usully I'd use a useColorScheme() for device system preference value.
// but for the purposes of this demo, I'm just going to use a redux store value so you can manually toggle it.
export const appSettingsSlice = createSlice({
  name: 'appSettingsSlice',
  initialState,
  reducers: {
    setColorScheme: (state, action: PayloadAction<"dark" | "light">) => {
      state.theme = action.payload;
      return state;
    },
  }
});

export const selectColorScheme = (state: RootState) => state.appSettings.theme;

export const {
  setColorScheme,
} = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
