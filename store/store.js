import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import musicReducer from './musicSlice';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    music: musicReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
