// Esta saga no se esta utilizando, porque se cambio a un mencanismo de websocket
// para mayor interactividad, sin embargo no se ha eliminado porque en el futuro se podria
// volver a este modelo.
import { API_URL_STATISTICS } from "../client/constants";
import { takeLatest, call, put } from "redux-saga/effects";
import {
  GET_ALERTS_TOOLBAR_REQUEST,
  GET_ALERTS_TOOLBAR_SUCCESS,
  MARK_READ_ALERTS
} from "./constants";

function* getAlertsToolbarFlow(action) {
  try {
    //Obtener region de la accion para solicitar el alerta
    let headers = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    });

    let init = {
      method: "GET",
      headers: headers,
      mode: "cors",
      cache: "default"
    };
    let apiUrl = API_URL_STATISTICS;
    let received = yield call(fetch, apiUrl, init);
    let receivedToJson = yield call([received, "json"]);

    yield put({ type: GET_ALERTS_TOOLBAR_SUCCESS, receivedToJson });
  } catch (err) {
    console.log(err);
  }
}

function* markReadAlertsFlow(action) {
  try {
    //Obtener Usuario de la accion para marcar alertas como leidas
    let headers = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    });

    let init = {
      method: "GET",
      headers: headers,
      mode: "cors",
      cache: "default"
    };
    let apiUrl = API_URL_STATISTICS;
    let received = yield call(fetch, apiUrl, init);
    let receivedToJson = yield call([received, "json"]);

    yield put({ type: GET_ALERTS_TOOLBAR_SUCCESS, receivedToJson });
  } catch (err) {
    console.log(err);
  }
}

function* getAlertsToolbar() {
  yield takeLatest(GET_ALERTS_TOOLBAR_REQUEST, getAlertsToolbarFlow);
}

function* markReadAlerts() {
  yield takeLatest(MARK_READ_ALERTS, markReadAlertsFlow);
}

export { getAlertsToolbar, markReadAlerts };
