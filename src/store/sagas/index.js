import { all } from 'redux-saga/effects';
import { musicSaga } from './musicSaga';

export default function* rootSaga() {
  yield all([
    musicSaga(),
  ]);
}
