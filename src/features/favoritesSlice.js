import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as favoritesService from '../services/favoritesService';

export const loadFavorites = createAsyncThunk(
  'favorites/loadFavorites',
  async (user, thunkAPI) => {
    const result = await favoritesService.loadFavorites(user);
    return result;
  }
);

export const saveFavorites = createAsyncThunk(
  'favorites/saveFavorites',
  async ({ user, favorites }, thunkAPI) => {
    await favoritesService.saveFavorites(user, favorites);
    return favorites;
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    selected: [],
    loading: false,
    error: null,
    mergedWithLocal: false,
    user: null,
  },
  reducers: {
    toggleSelect(state, action) {
      const title = action.payload;
      if (state.selected.includes(title)) {
        state.selected = state.selected.filter(t => t !== title);
      } 
      else {
        state.selected.push(title);
      }
    },
    unselectAll(state) {
      state.selected = [];
    },
    removeSelected(state) {
      state.favorites = state.favorites.filter(book => !state.selected.includes(book.title));
      state.selected = [];
    },
    clearAll(state) {
      state.favorites = [];
      state.selected = [];
    },
    setUser(state, action) {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload.favorites;
        state.mergedWithLocal = action.payload.mergedWithLocal;
      })
      .addCase(loadFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(saveFavorites.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const { toggleSelect, unselectAll, removeSelected, clearAll, setUser } = favoritesSlice.actions;
export default favoritesSlice.reducer;