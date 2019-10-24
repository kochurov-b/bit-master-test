import { takeLatest, put } from "redux-saga/effects";

import responseCrews from "../../crews.json";
import { ECrewsTypes } from "../types/crews";
import { getCrewsSuccess, getCrewsFailure } from "../actions/crews";

function* workerGetCrews() {
  try {
    const {
      data: { crews_info }
    } = responseCrews;

    yield put(getCrewsSuccess(crews_info));
  } catch (error) {
    yield put(getCrewsFailure());
  }
}

export function* watcherGetCrews() {
  yield takeLatest(ECrewsTypes.GET_CREWS_REQUEST, workerGetCrews);
}
