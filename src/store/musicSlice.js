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
    addToPlaylist: (state, action) => {
      const music = action.payload;
      const isAlreadyInPlaylist = state.playlist.some(
        (track) => track.listeners === music.listeners && track.name === music.name
      );
      if (!isAlreadyInPlaylist) {
        state.playlist.push(music);
        state.message = `${music.name} successfully added to playlist! Scroll down to view.`;
      } else {
        state.message = `${music.name} is already in the playlist!`;
      }
    },
    deleteFromPlaylist: (state, action) => {
      const music = action.payload;
      state.playlist = state.playlist.filter(
        (track) => !(track.listeners === music.listeners && track.name === music.name)
      );
    },
    updatePlaylist: (state, action) => {
      const { music, newName } = action.payload;
      state.playlist = state.playlist.map((track) =>
        track.listeners === music.listeners && track.name === music.name
          ? { ...track, name: newName }
          : track
      );
    },
    clearMessage: (state) => {
      state.message = '';
    },
  },
});

export const {
  setMusics,
  setSearchTerm,
  addToPlaylist,
  deleteFromPlaylist,
  updatePlaylist,
  clearMessage,
} = musicSlice.actions;

export default musicSlice.reducer;
