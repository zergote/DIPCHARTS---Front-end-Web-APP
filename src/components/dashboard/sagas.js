import { API_URL_STATISTICS } from '../client/constants'
import { takeLatest, call, put } from 'redux-saga/effects'
import {
  SET_COMPLETE_FETCH_DATA_PAYLOAD_MTD,
  SET_COMPLETE_FETCH_DATA_ERLANG_MTD,
  SET_COMPLETE_FETCH_DATA_PAYLOAD_BY_MONTH,
  SET_COMPLETE_FETCH_DATA_ERLANG_BY_MONTH,
  ERLANG_UNTIL_30_DAYS_REQUESTING,
  ERLANG_UNTIL_30_DAYS_SUCCESS,
  PAYLOAD_UNTIL_30_DAYS_REQUESTING,
  PAYLOAD_UNTIL_30_DAYS_SUCCESS,
  ERLANG_LATEST_12_MONTHS_REQUESTING,
  ERLANG_LATEST_12_MONTHS_SUCCESS,
  PAYLOAD_LATEST_12_MONTHS_REQUESTING,
  PAYLOAD_LATEST_12_MONTHS_SUCCESS,
  SUM_KPI_MONTH_COMP_REQUESTING,
  SUM_KPI_MONTH_COMP_SUCCESS,
  TOP_STATION_ERLANG_REQUESTING,
  TOP_STATION_ERLANG_SUCCESS,
  TOP_STATION_PAYLOAD_REQUESTING,
  TOP_STATION_PAYLOAD_SUCCESS,
  SET_FIRST_STATION_ERLANG,
  SET_SECOND_STATION_ERLANG,
  SET_THIRD_STATION_ERLANG,
  SET_FIRST_STATION_PAYLOAD,
  SET_SECOND_STATION_PAYLOAD,
  SET_THIRD_STATION_PAYLOAD,
  REGION_DASHBOARD_SUCCESS,
  SELECTED_DASHBOARD_REGION,
  SET_ERLANG_SUM_MES_ACTUAL,
  SET_ERLANG_SUM_MES_ANTERIOR,
  SET_PAYLOAD_SUM_MES_ACTUAL,
  SET_PAYLOAD_SUM_MES_ANTERIOR,
  REGION_DASHBOARD_REQUESTING,
  //GET_ALERTS_DASHBOARD_REQUEST,
  //GET_ALERTS_DASHBOARD_SUCCESS
} from './constants'

function* getRegionFlow() {
  try {
    let headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })

    let init = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default',
    }

    let apiUrl = API_URL_STATISTICS + '/region'
    let received = yield call(fetch, apiUrl, init)
    const regions = yield call([received, 'json'])
    yield put({ type: REGION_DASHBOARD_SUCCESS, regions })
  } catch (err) {
    let region = { ID: null, REGION: 'SIN CONEXION' }
    yield put({ type: SELECTED_DASHBOARD_REGION, region })
    const regions = { sinconexion: { ID: null, REGION: 'SIN CONEXION' } }
    yield put({ type: REGION_DASHBOARD_SUCCESS, regions })
  }
}

function* getTopStationsErlangFlow(action) {
  try {
    let { ID_REGION, ACTUALCONFIG } = action.value

    let headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })

    let init = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default',
    }

    let apiUrl =
      API_URL_STATISTICS + '/dashboard/topstationserlang/' + ID_REGION

    let receivedForJson = yield call(fetch, apiUrl, init)
    const received = yield call([receivedForJson, 'json'])
    //Tratando la información para adecuarla a la grafica y al modulo receptores
    let nameStations = []
    let dataErlang2g = []
    let dataErlang3g = []
    let total = []

    Object.keys(received).map((key, index) => {
      nameStations.push(received[key].name)
      dataErlang2g.push(parseFloat(received[key].erlang2g))
      dataErlang3g.push(parseFloat(received[key].erlang3g))
      total.push(parseFloat(received[key].total))
      return true
    })

    let config = { ...ACTUALCONFIG }

    config.xAxis.categories = nameStations
    let serieErlang2g = {
      name: 'Voz 2G',
      data: dataErlang2g,
      stack: 'Datos',
      color: '#E07E39',
      tooltip: {
        valueDecimals: 2,
      },
    }

    let serieErlang3g = {
      name: 'Voz 3G',
      data: dataErlang3g,
      stack: 'Datos',
      color: '#8085e9',
      tooltip: {
        valueDecimals: 2,
      },
    }
    config.series = []
    config.series.push(serieErlang2g)
    config.series.push(serieErlang3g)

    //Asignando información a la grafica
    yield put({ type: TOP_STATION_ERLANG_SUCCESS, config })

    //Preparando información para los tres primeros lugares
    let firstStationErlang = {
      name: nameStations[0],
      value: total[0],
    }
    let secondStationErlang = {
      name: nameStations[1],
      value: total[1],
    }
    let thirdStationErlang = {
      name: nameStations[2],
      value: total[2],
    }

    //Asignando información para los primeros tres lugares
    yield put({ type: SET_FIRST_STATION_ERLANG, firstStationErlang })
    yield put({ type: SET_SECOND_STATION_ERLANG, secondStationErlang })
    yield put({ type: SET_THIRD_STATION_ERLANG, thirdStationErlang })
  } catch (error) {
    //Preparando información para los tres primeros lugares
    let firstStationErlang = {
      name: 'SIN CONEXIÓN',
      value: 0,
    }
    let secondStationErlang = {
      name: 'SIN CONEXIÓN',
      value: 0,
    }
    let thirdStationErlang = {
      name: 'SIN CONEXIÓN',
      value: 0,
    }

    //Asignando información para los primeros tres lugares
    yield put({ type: SET_FIRST_STATION_ERLANG, firstStationErlang })
    yield put({ type: SET_SECOND_STATION_ERLANG, secondStationErlang })
    yield put({ type: SET_THIRD_STATION_ERLANG, thirdStationErlang })
    console.log(error)
  }
}

function* getTopStationsPayloadFlow(action) {
  try {
    let { ID_REGION, ACTUALCONFIG } = action.value
    let headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })

    let init = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default',
    }

    let apiUrl =
      API_URL_STATISTICS + '/dashboard/topstationspayload/' + ID_REGION
    let receivedForJson = yield call(fetch, apiUrl, init)
    const received = yield call([receivedForJson, 'json'])
    //Tratando la información para adecuarla a la grafica y al modulo receptores
    let nameStations = []
    let dataPayload2g = []
    let dataPayload3g = []
    let dataPayload4g = []
    let total = []

    Object.keys(received).map((key, index) => {
      nameStations.push(received[key].name)
      dataPayload2g.push(parseFloat(received[key].payload2g))
      dataPayload3g.push(parseFloat(received[key].payload3g))
      dataPayload4g.push(parseFloat(received[key].payload4g))
      total.push(parseFloat(received[key].total))
      return true
    })
    let config = { ...ACTUALCONFIG }

    config.xAxis.categories = nameStations

    let seriePayload2g = {
      name: 'Datos 2G',
      data: dataPayload2g,
      stack: 'Datos',
      color: '#00D0CB',
      tooltip: {
        valueDecimals: 2,
      },
    }

    let seriePayload3g = {
      name: 'Datos 3G',
      data: dataPayload3g,
      stack: 'Datos',
      color: '#8085e9',
      tooltip: {
        valueDecimals: 2,
      },
    }

    let seriePayload4g = {
      name: 'Datos 4G',
      data: dataPayload4g,
      stack: 'Datos',
      color: '#f45b5b',
      tooltip: {
        valueDecimals: 2,
      },
    }

    config.series = []
    config.series.push(seriePayload2g)
    config.series.push(seriePayload3g)
    config.series.push(seriePayload4g)

    //const stations = yield call([received, 'json'])

    //Asignando información a la grafica
    yield put({ type: TOP_STATION_PAYLOAD_SUCCESS, config })

    //Preparando información para los tres primeros lugares
    let firstStationPayload = {
      name: nameStations[0],
      value: total[0],
    }
    let secondStationPayload = {
      name: nameStations[1],
      value: total[1],
    }
    let thirdStationPayload = {
      name: nameStations[2],
      value: total[2],
    }

    //Asignando información para los primeros tres lugares
    yield put({ type: SET_FIRST_STATION_PAYLOAD, firstStationPayload })
    yield put({ type: SET_SECOND_STATION_PAYLOAD, secondStationPayload })
    yield put({ type: SET_THIRD_STATION_PAYLOAD, thirdStationPayload })
  } catch (error) {
    //Preparando información para los tres primeros lugares
    let firstStationPayload = {
      name: 'SIN CONEXIÓN',
      value: 0,
    }
    let secondStationPayload = {
      name: 'SIN CONEXIÓN',
      value: 0,
    }
    let thirdStationPayload = {
      name: 'SIN CONEXIÓN',
      value: 0,
    }

    //Asignando información para los primeros tres lugares
    yield put({ type: SET_FIRST_STATION_PAYLOAD, firstStationPayload })
    yield put({ type: SET_SECOND_STATION_PAYLOAD, secondStationPayload })
    yield put({ type: SET_THIRD_STATION_PAYLOAD, thirdStationPayload })
    console.log(error)
  }
}

function* getSumTotalKpiMTDFlow(action) {
  try {
    let { ID_REGION, ACTUALCONFIG } = action.value

    let headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })

    let init = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default',
    }
    let config = { ...ACTUALCONFIG }
    let apiUrlErlang =
      API_URL_STATISTICS + '/dashboard/sumerlangmtd/' + ID_REGION
    let receivedForJsonE = yield call(fetch, apiUrlErlang, init)
    const receivedErlang = yield call([receivedForJsonE, 'json'])
    let erlangMesAnterior
    let erlangMesActual
    Object.keys(receivedErlang).map((key, index) => {
      if (receivedErlang[key].mes_actual) {
        erlangMesActual = parseFloat(receivedErlang[key].total)
      } else {
        erlangMesAnterior = parseFloat(receivedErlang[key].total)
      }
      return true
    })

    let apiUrlPayload =
      API_URL_STATISTICS + '/dashboard/sumpayloadgmtd/' + ID_REGION
    let receivedForJsonP = yield call(fetch, apiUrlPayload, init)
    const receivedPayload = yield call([receivedForJsonP, 'json'])
    let payloadMesAnterior
    let payloadMesActual

    Object.keys(receivedPayload).map((key, index) => {
      if (receivedPayload[key].mes_actual) {
        payloadMesActual = parseFloat(receivedPayload[key].total)
      } else {
        payloadMesAnterior = parseFloat(receivedPayload[key].total)
      }
      return true
    })

    let seriePayloadSumTotal = {
      name: 'Payload',
      data: [payloadMesAnterior, payloadMesActual],
      yAxis: 0,
      tooltip: {
        valueDecimals: 2,
      },
    }

    let serieErlangSumTotal = {
      name: 'Erlang',
      data: [erlangMesAnterior, erlangMesActual],
      yAxis: 1,
      tooltip: {
        valueDecimals: 2,
      },
    }

    config.series = []
    config.series.push(serieErlangSumTotal)
    config.series.push(seriePayloadSumTotal)

    //Asignando información a la grafica
    yield put({ type: SUM_KPI_MONTH_COMP_SUCCESS, config })

    //Asignando valores a las variables para el calculo de los porcentages de crecimiento o decrecimiento
    yield put({ type: SET_ERLANG_SUM_MES_ANTERIOR, erlangMesAnterior })
    yield put({ type: SET_ERLANG_SUM_MES_ACTUAL, erlangMesActual })
    yield put({ type: SET_PAYLOAD_SUM_MES_ANTERIOR, payloadMesAnterior })
    yield put({ type: SET_PAYLOAD_SUM_MES_ACTUAL, payloadMesActual })
  } catch (error) {
    let erlangMesAnterior = 1
    let erlangMesActual = 1
    let payloadMesAnterior = 1
    let payloadMesActual = 1
    yield put({ type: SET_ERLANG_SUM_MES_ANTERIOR, erlangMesAnterior })
    yield put({ type: SET_ERLANG_SUM_MES_ACTUAL, erlangMesActual })
    yield put({ type: SET_PAYLOAD_SUM_MES_ANTERIOR, payloadMesAnterior })
    yield put({ type: SET_PAYLOAD_SUM_MES_ACTUAL, payloadMesActual })
    console.log(error)
  }
}

function* getErlangUntil30DaysFlow(action) {
  try {
    let { ID_REGION, ACTUALCONFIG } = action.value

    let value = false
    yield put({ type: SET_COMPLETE_FETCH_DATA_ERLANG_MTD, value })

    let headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })

    let init = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default',
    }
    let config = { ...ACTUALCONFIG }

    let apiUrlErlang2g =
      API_URL_STATISTICS + '/dashboard/erlang2guntil30days/' + ID_REGION
    let receivedForJsonE2g = yield call(fetch, apiUrlErlang2g, init)
    const receivedErlang2g = yield call([receivedForJsonE2g, 'json'])

    let apiUrlErlang3g =
      API_URL_STATISTICS + '/dashboard/erlang3guntil30days/' + ID_REGION
    let receivedForJsonE3g = yield call(fetch, apiUrlErlang3g, init)
    const receivedErlang3g = yield call([receivedForJsonE3g, 'json'])

    let fixDataErlang2g = []
    let fixDataErlang3g = []
    receivedErlang2g.map((element, index) => {
      fixDataErlang2g.push([element[0], parseFloat(element[1])])
      return true
    })

    receivedErlang3g.map((element, index) => {
      fixDataErlang3g.push([element[0], parseFloat(element[1])])
      return true
    })

    config.series = []
    let serieErlang2g = {
      name: 'Erlang 2G',
      data: fixDataErlang2g,
      yAxis: 0,
      type: 'line',
      color: '#E07E39',
      tooltip: {
        valueDecimals: 2,
      },
    }

    let serieErlang3g = {
      name: 'Erlang 3G',
      data: fixDataErlang3g,
      yAxis: 0,
      type: 'line',
      color: '#8085e9',
      tooltip: {
        valueDecimals: 2,
      },
    }

    //Asignando información a la grafica
    config.series.push(serieErlang2g)
    config.series.push(serieErlang3g)
    yield put({ type: ERLANG_UNTIL_30_DAYS_SUCCESS, config })
    value = true
    yield put({ type: SET_COMPLETE_FETCH_DATA_ERLANG_MTD, value })
  } catch (error) {
    let value = true
    yield put({ type: SET_COMPLETE_FETCH_DATA_ERLANG_MTD, value })
    console.log(error)
  }
}

function* getPayloadUntil30DaysFlow(action) {
  try {
    let { ID_REGION, ACTUALCONFIG } = action.value

    let value = false
    yield put({ type: SET_COMPLETE_FETCH_DATA_PAYLOAD_MTD, value })

    let headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })

    let init = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default',
    }
    let config = { ...ACTUALCONFIG }

    let apiUrlPayload2g =
      API_URL_STATISTICS + '/dashboard/payload2guntil30days/' + ID_REGION
    let receivedForJsonP2g = yield call(fetch, apiUrlPayload2g, init)
    const receivedPayload2g = yield call([receivedForJsonP2g, 'json'])

    let apiUrlPayload3g =
      API_URL_STATISTICS + '/dashboard/payload3guntil30days/' + ID_REGION
    let receivedForJsonP3g = yield call(fetch, apiUrlPayload3g, init)
    const receivedPayload3g = yield call([receivedForJsonP3g, 'json'])

    let apiUrlPayload4g =
      API_URL_STATISTICS + '/dashboard/payload4guntil30days/' + ID_REGION
    let receivedForJsonP4g = yield call(fetch, apiUrlPayload4g, init)
    const receivedPayload4g = yield call([receivedForJsonP4g, 'json'])

    let fixDataPayload2g = []
    let fixDataPayload3g = []
    let fixDataPayload4g = []

    receivedPayload2g.map((element, index) => {
      fixDataPayload2g.push([element[0], parseFloat(element[1])])
      return true
    })

    receivedPayload3g.map((element, index) => {
      fixDataPayload3g.push([element[0], parseFloat(element[1])])
      return true
    })

    receivedPayload4g.map((element, index) => {
      fixDataPayload4g.push([element[0], parseFloat(element[1])])
      return true
    })

    config.series = []

    let seriePayload2g = {
      name: 'Payload 2G',
      data: fixDataPayload2g,
      yAxis: 0,
      type: 'line',
      color: '#00D0CB',
      tooltip: {
        valueDecimals: 2,
      },
    }

    let seriePayload3g = {
      name: 'Payload 3G',
      data: fixDataPayload3g,
      yAxis: 0,
      type: 'line',
      color: '#8085e9',
      tooltip: {
        valueDecimals: 2,
      },
    }

    let seriePayload4g = {
      name: 'Payload 3G',
      data: fixDataPayload4g,
      yAxis: 0,
      type: 'line',
      color: '#f45b5b',
      tooltip: {
        valueDecimals: 2,
      },
    }

    config.series.push(seriePayload2g)
    config.series.push(seriePayload3g)
    config.series.push(seriePayload4g)

    //Asignando información a la grafica
    yield put({ type: PAYLOAD_UNTIL_30_DAYS_SUCCESS, config })
    value = true
    yield put({ type: SET_COMPLETE_FETCH_DATA_PAYLOAD_MTD, value })
  } catch (error) {
    let value = true
    yield put({ type: SET_COMPLETE_FETCH_DATA_PAYLOAD_MTD, value })
    console.log(error)
  }
}

function* getErlangLatest12MonthsFlow(action) {
  try {
    let { ID_REGION, ACTUALCONFIG } = action.value
    let monthsString = [
      null,
      'Ene.',
      'Feb.',
      'Mar.',
      'Abr.',
      'May.',
      'Jun.',
      'Jul.',
      'Ago.',
      'Oct.',
      'Sep.',
      'Nov.',
      'Dic.',
    ]
    let value = false
    yield put({ type: SET_COMPLETE_FETCH_DATA_ERLANG_BY_MONTH, value })

    let headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })

    let init = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default',
    }
    let config = { ...ACTUALCONFIG }

    let apiUrlSumErlang12Months =
      API_URL_STATISTICS + '/dashboard/sumerlangbymonth/' + ID_REGION
    let receivedForJsonE2g12Month = yield call(
      fetch,
      apiUrlSumErlang12Months,
      init
    )
    const receivedSumErlang12Month = yield call([
      receivedForJsonE2g12Month,
      'json',
    ])

    let months = []
    let years = []
    let total = []

    Object.keys(receivedSumErlang12Month).map((key, index) => {
      months.push(receivedSumErlang12Month[key].month)
      years.push(receivedSumErlang12Month[key].year)
      total.push(receivedSumErlang12Month[key].total)
      return true
    })

    let categories = []
    months.map((element, index) => {
      let monthYearString = monthsString[element] + '/' + years[index]
      categories.push(monthYearString)
      return true
    })
    config.xAxis.categories = categories

    let fixDataErlangTotal = []

    total.map((element, index) => {
      fixDataErlangTotal.push([parseFloat(element)])
      return true
    })

    let erlangByMonth = {
      name: 'Erlang',
      data: fixDataErlangTotal,
      type: 'column',
      color: '#E07E39',
      tooltip: {
        valueDecimals: 2,
      },
    }

    config.series = []
    config.series.push(erlangByMonth)

    //Asignando información a la grafica
    yield put({ type: ERLANG_LATEST_12_MONTHS_SUCCESS, config })
    value = true
    yield put({ type: SET_COMPLETE_FETCH_DATA_ERLANG_BY_MONTH, value })
  } catch (error) {
    let value = true
    yield put({ type: SET_COMPLETE_FETCH_DATA_ERLANG_BY_MONTH, value })
    console.log(error)
  }
}

function* getPayloadLatest12MonthsFlow(action) {
  try {
    let { ID_REGION, ACTUALCONFIG } = action.value
    let monthsString = [
      null,
      'Ene.',
      'Feb.',
      'Mar.',
      'Abr.',
      'May.',
      'Jun.',
      'Jul.',
      'Ago.',
      'Oct.',
      'Sep.',
      'Nov.',
      'Dic.',
    ]

    let value = false
    yield put({ type: SET_COMPLETE_FETCH_DATA_PAYLOAD_BY_MONTH, value })

    let headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })

    let init = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default',
    }
    let config = { ...ACTUALCONFIG }

    let apiUrlSumPayload12Months =
      API_URL_STATISTICS + '/dashboard/sumpayloadbymonth/' + ID_REGION
    let receivedForJsonP2g12Month = yield call(
      fetch,
      apiUrlSumPayload12Months,
      init
    )
    const receivedSumPayload12Month = yield call([
      receivedForJsonP2g12Month,
      'json',
    ])

    let months = []
    let years = []
    let total = []

    Object.keys(receivedSumPayload12Month).map((key, index) => {
      months.push(receivedSumPayload12Month[key].month)
      years.push(receivedSumPayload12Month[key].year)
      total.push(receivedSumPayload12Month[key].total)
      return true
    })

    let categories = []
    months.map((element, index) => {
      let monthYearString = monthsString[element] + '/' + years[index]
      categories.push(monthYearString)
      return true
    })
    config.xAxis.categories = categories

    let fixDataErlangTotal = []

    total.map((element, index) => {
      fixDataErlangTotal.push([parseFloat(element)])
      return true
    })

    let payloadByMonth = {
      name: 'Payload',
      data: fixDataErlangTotal,
      type: 'column',
      color: '#00D0CB',
      tooltip: {
        valueDecimals: 2,
      },
    }
    config.series = []
    config.series.push(payloadByMonth)

    //Asignando información a la grafica
    yield put({ type: PAYLOAD_LATEST_12_MONTHS_SUCCESS, config })
    value = true
    yield put({ type: SET_COMPLETE_FETCH_DATA_PAYLOAD_BY_MONTH, value })
  } catch (error) {
    let value = true
    yield put({ type: SET_COMPLETE_FETCH_DATA_PAYLOAD_BY_MONTH, value })
    console.log(error)
  }
}

/*
function* getAlertFlow(action) {
  try {
    //Arreglar Ruta De Alertas\
    //Obtener region de la accion para solicitar los alertas
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

    yield put({ type: GET_ALERTS_DASHBOARD_SUCCESS, receivedToJson });
  } catch (err) {
    console.log(err);
  }
}
*/
function* getTopStationsErlangWatcher() {
  yield takeLatest(TOP_STATION_ERLANG_REQUESTING, getTopStationsErlangFlow)
}

function* getTopStationsPayloadWatcher() {
  yield takeLatest(TOP_STATION_PAYLOAD_REQUESTING, getTopStationsPayloadFlow)
}

function* getSumTotalKpiMTDWatcher() {
  yield takeLatest(SUM_KPI_MONTH_COMP_REQUESTING, getSumTotalKpiMTDFlow)
}

function* getErlangUntil30DaysWatcher() {
  yield takeLatest(ERLANG_UNTIL_30_DAYS_REQUESTING, getErlangUntil30DaysFlow)
}

function* getPayloadUntil30DaysWatcher() {
  yield takeLatest(PAYLOAD_UNTIL_30_DAYS_REQUESTING, getPayloadUntil30DaysFlow)
}

function* getErlangLatest12MonthsWatcher() {
  yield takeLatest(
    ERLANG_LATEST_12_MONTHS_REQUESTING,
    getErlangLatest12MonthsFlow
  )
}

function* getPayloadLatest12MonthsWatcher() {
  yield takeLatest(
    PAYLOAD_LATEST_12_MONTHS_REQUESTING,
    getPayloadLatest12MonthsFlow
  )
}

function* getRegionDashboardWatcher() {
  yield takeLatest(REGION_DASHBOARD_REQUESTING, getRegionFlow)
}
/*
function* getAlertsDashboardWatcher() {
  yield takeLatest(GET_ALERTS_DASHBOARD_REQUEST, getAlertFlow);
}
*/
export {
  getRegionDashboardWatcher,
  getTopStationsErlangWatcher,
  getTopStationsPayloadWatcher,
  getSumTotalKpiMTDWatcher,
  getErlangUntil30DaysWatcher,
  getPayloadUntil30DaysWatcher,
  getErlangLatest12MonthsWatcher,
  getPayloadLatest12MonthsWatcher,
}
