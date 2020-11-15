import { all } from "redux-saga/effects";
import { waitForGetStockData } from "../sagas/stockSaga";

export default function* rootSaga() {
  yield all([waitForGetStockData()]);
}
