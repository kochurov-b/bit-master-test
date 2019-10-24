import { all, fork } from "redux-saga/effects";
import { watcherGetCrews } from "./crews";

export default function* rootSaga() {
  yield all([fork(watcherGetCrews)]);
}
