import { put, takeEvery } from 'redux-saga/effects';

import HomeActions from './actions.types';

function* fetchMovies() {
    try {
        const apiResult = yield fetch('http://localhost:8080/movies/allMovie').then(res => res.json());
        yield put({
            type: HomeActions.FETCH_MOVIES_SUCCESS, payload: apiResult
        });
    } catch (err) {
        yield put({
            type: HomeActions.FETCH_MOVIES_FAILURE, payload: err
        });
    }
}

export default function* homeSaga() {
yield takeEvery(HomeActions.FETCH_MOVIES, fetchMovies);
} 