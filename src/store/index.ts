import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const logger = createLogger({
  collapsed: true
});

const sagaMiddleware = createSagaMiddleware();

export type StoreType = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  applyMiddleware(logger, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
