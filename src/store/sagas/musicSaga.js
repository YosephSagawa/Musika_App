import { call, put, takeLatest, select } from 'redux-saga/effects';
import { setMusics, setMessage, setPlaylist } from '../musicSlice';

const API_KEY = "89838bf2d11d62f073e2804007089934";
const API_URL = "https://ws.audioscrobbler.com/2.0/";

function* fetchMusic(action) {
  try {
    const response = yield call(fetch, `${API_URL}?method=track.search&track=${action.payload}&api_key=${API_KEY}&format=json`);
    const data = yield response.json();
    yield put(setMusics(data.results.trackmatches.track || []));
  } catch (error) {
    console.error("Error fetching music data:", error);
  }
}

function* addToPlaylist(action) {
  try {
    const currentPlaylist = yield select((state) => state.music.playlist);
    const isAlreadyInPlaylist = currentPlaylist.some(
      (song) => song.name === action.payload.name && song.artist === action.payload.artist
    );
    if (!isAlreadyInPlaylist) {
      const updatedPlaylist = [...currentPlaylist, action.payload]; 
      yield put(setPlaylist(updatedPlaylist));
      yield put(setMessage(`${action.payload.name} successfully added to playlist!`));
    } else {
      yield put(setMessage(`${action.payload.name} is already in the playlist!`));
    }
  } catch (error) {
    console.error("Error adding music to playlist:", error);
  }
}


function* deleteFromPlaylist(action) {
  try {
    const currentPlaylist = yield select((state) => state.music.playlist);
    const updatedPlaylist = currentPlaylist.filter(
      (music) => music.name !== action.payload.name || music.artist !== action.payload.artist
    );
    yield put(setPlaylist(updatedPlaylist));
  } catch (error) {
    console.error("Error deleting music from playlist:", error);
  }
}

function* updatePlaylist(action) {
  try {
    const currentPlaylist = yield select((state) => state.music.playlist);
    const updatedPlaylist = currentPlaylist.map((music) =>
      music.name === action.payload.music.name && music.artist === action.payload.music.artist
        ? { ...music, name: action.payload.newName }
        : music
    );
    yield put(setPlaylist(updatedPlaylist));
  } catch (error) {
    console.error("Error updating music in playlist:", error);
  }
}

export function* musicSaga() {
  yield takeLatest('music/fetchMusic', fetchMusic);
  yield takeLatest('music/addToPlaylist', addToPlaylist);
  yield takeLatest('music/deleteFromPlaylist', deleteFromPlaylist);
  yield takeLatest('music/updatePlaylist', updatePlaylist);
}
