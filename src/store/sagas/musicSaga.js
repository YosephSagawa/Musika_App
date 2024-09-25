import { call, put, takeLatest } from 'redux-saga/effects';
import { setMusics } from '../musicSlice';

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

export function* musicSaga() {
  yield takeLatest('music/fetchMusic', fetchMusic);
}
