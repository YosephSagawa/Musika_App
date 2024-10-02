import { createSlice } from '@reduxjs/toolkit';

const musicSlice = createSlice({
  name: 'music',
  initialState: {
    musics: [],
    playlist: [],
    searchTerm: '',
    message: '',
  },

reducers: {
  setMusics: (state, action) => {
    state.musics = action.payload;
  },
  setSearchTerm: (state, action) => {
    state.searchTerm = action.payload;
  },
  setPlaylist: (state, action) => {
    state.playlist = action.payload;
  },
  setMessage: (state, action) => {
    state.message = action.payload;
  },
  clearMessage: (state) => {
    state.message = '';
  },
},

});

export const {
  setMusics,
  setSearchTerm,
  setMessage,
  setPlaylist,
  clearMessage,
} = musicSlice.actions;

export default musicSlice.reducer;
