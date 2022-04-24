import { put, takeEvery, select } from 'redux-saga/effects';

import SelectionActions from './actions.types';  
// import jsonData from '../../../public/Seat.json'

function* fetchVenues() {
    try {
        const apiResult = yield fetch(`http://localhost:8080/venues/allTheater`).then(res => res.json());
        yield put({
            type: SelectionActions.FETCH_VENUES_SUCCESS, payload: apiResult
        });
    } catch (err) {
        yield put({
            type: SelectionActions.FETCH_VENUES_FAILURE, payload: err
        });
    }
}

function* fetchAvailabilities() {
    try {
        let movieId = yield select((state) => state.selectionReducer.selectedMovie);
        console.log(movieId)
        let venueName = yield select((state) => state.selectionReducer.selectedVenue);
        const apiResult = yield fetch(`/Seat.json
        ${venueName}`).then(res => res.json());
        yield put({
            type: SelectionActions.FETCH_AVAILABILITIES_SUCCESS, payload: apiResult
        });
    } catch (err) {
        yield put({
            type: SelectionActions.FETCH_AVAILABILITIES_FAILURE, payload: err
        });
    }
}

function* modifyAvailabilities(action) {
    try {
        let movieId = yield select((state) => state.selectionReducer.selectedMovie._id);
        let venue = yield select((state) => state.selectionReducer.selectedVenue);
        let selectedSeats = yield select((state) => state.selectionReducer.selectedSeats);
        let reqBody = {
            movieId: movieId,
            venueName: venue,
            seatNumbers: selectedSeats,
            newStatus: action.payload
        };
        reqBody = JSON.stringify(reqBody);

        const apiResult = yield fetch(`http://localhost:8080/seats/book`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: reqBody
        }).then(res => res.json());
        yield put({
            type: SelectionActions.MODIFY_AVAILABILITIES_SUCCESS, payload: { result: apiResult, seatStatus: action.payload }
        });
    } catch (err) {
        yield put({
            type: SelectionActions.MODIFY_AVAILABILITIES_FAILURE, payload: err
        });
    }
}

export default function* homeSaga() {
    yield takeEvery(SelectionActions.FETCH_VENUES, fetchVenues);
    yield takeEvery(SelectionActions.FETCH_AVAILABILITIES, fetchAvailabilities);
    yield takeEvery(SelectionActions.MODIFY_AVAILABILITIES, modifyAvailabilities);
}