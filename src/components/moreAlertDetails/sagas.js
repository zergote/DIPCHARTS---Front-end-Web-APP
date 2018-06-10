import { API_URL_STATISTICS } from '../client/constants'
import { takeLatest, call, put } from 'redux-saga/effects'
import {
  SET_PRELOADER_STATE_MORE_ALERT_DETAILS,
  STATISTICS_SUCCESS_MORE_ALERT_DETAILS,
  SET_CONFIG_CLEAN_SERIES_MORE_ALERT_DETAILS,
  STATISTICS_REQUESTING_MORE_ALERT_DETAILS,
} from './constants'

function* getStatisticsMoreDetailsFlow(action) {
  let {
    KPISELECTED,
    ACTUALCONFIG,
    THEME,
    IDSERVICE,
    SINCETHEDATE,
    UNTILTHEDATE,
    STATION,
    KPIVALUE,
  } = action.value
  let config = { ...ACTUALCONFIG }

  let kpiGroups = {
    CCR: '%',
    PCR: '%',
    ERLANGS: 'ERL',
    ERLANG: 'ERL',
    PAYLOAD_TOT: 'MB',
    THROUGHPUT_HSDPA: 'kbps',
    THROUGHPUTDL_KBPS: 'kbps',
    USERS_HSDPA: 'Users',
    USERS_HSUPA: 'Users',
    USERSDL: 'Users',
    USERSUL: 'Users',
  }
  let memoryLinkedYAxis = {}
  let linkedTo = null
  let counterMemoryYAxis = 0

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
  let legendValue = {
    CCR: 'CCR',
    PCR: 'PCR',
    PAYLOAD_TOT: 'PAYLOAD TOTAL',
    THROUGHPUT_HSDPA: 'THROUGHPUT',
    USERS_HSDPA: 'USUARIOS HSDPA',
    THROUGHPUTDL_KBPS: 'THROUGHPUT',
    ERLANGS: 'ERLANG',
    ERLANG: 'ERLANG',
  }
  try {
    yield put({ type: SET_CONFIG_CLEAN_SERIES_MORE_ALERT_DETAILS })
    let completeFetchData = false
    yield put({
      type: SET_PRELOADER_STATE_MORE_ALERT_DETAILS,
      completeFetchData,
    })

    //Asignando titulo a grafica
    config.title = {
      text: 'ESTADISTICA DE ' + legendValue[KPISELECTED] + ' DE LA ESTACION ' + STATION,
    }

    //Limpiar datos de la grafica anterior
    config.series = []
    config.yAxis = []

    let KPINAME = KPISELECTED
    if (KPINAME === 'PCR' && IDSERVICE === 1) IDSERVICE = 2
    if (KPINAME === 'PCR' && IDSERVICE === 3) IDSERVICE = 4

    ///stats/:sectorName/:idService/:kpiValue/:kpiName/:sinceTheDate/:untilTheDate'
    let apiUrl =
      API_URL_STATISTICS +
      '/stats/' +
      STATION +
      '/' +
      IDSERVICE +
      '/' +
      KPIVALUE +
      '/' +
      KPISELECTED +
      '/' +
      SINCETHEDATE +
      '/' +
      UNTILTHEDATE

    let received = yield call(fetch, apiUrl, init)
    let receivedToJson = yield call([received, 'json'])
    let group = kpiGroups[KPINAME]

    if (memoryLinkedYAxis[group] === undefined) {
      memoryLinkedYAxis[group] = counterMemoryYAxis++
      linkedTo = null
    } else {
      linkedTo = memoryLinkedYAxis[group]
    }

    let newYAxis = assignNewYAxis(KPINAME, 0, THEME, linkedTo)

    let newSerie = {
      type: 'line',
      name: legendValue[KPINAME],
      data: receivedToJson,
      yAxis: 0,
      tooltip: {
        valueDecimals: 2,
      },
    }
    config.yAxis.push(newYAxis)
    config.series.push(newSerie)

    console.log(config)

    yield put({ type: STATISTICS_SUCCESS_MORE_ALERT_DETAILS, config })
    completeFetchData = true
    yield put({
      type: SET_PRELOADER_STATE_MORE_ALERT_DETAILS,
      completeFetchData,
    })
  } catch (err) {
    yield put({ type: SET_CONFIG_CLEAN_SERIES_MORE_ALERT_DETAILS })
    console.log(err)
  }
}

function opositeValue(indexKey) {
  if (indexKey % 2 === 0) {
    return true
  } else {
    return false
  }
}

//Se puede hacer mejor consultando la tabla de kpis en base de datos y en base a esto armar las series.
//Esto evitaria problemas de actualizacion
function assignNewYAxis(value, indexKey, theme, linked) {
  let colors

  // colors = [
  //   "#d50032",
  //   "#5c068c",
  //   "#9e007e",
  //   "#e87722",
  //   "#6ba539",
  //   "#008675",
  //   "#009fdf",
  //   "#0033a0",
  //   "#f45b5b",
  //   "#91e8e1"
  // ];

  switch (theme) {
    case 'default':
      colors = [
        '#7cb5ec',
        '#434348',
        '#90ed7d',
        '#f7a35c',
        '#8085e9',
        '#f15c80',
        '#e4d354',
        '#2b908f',
        '#f45b5b',
        '#91e8e1',
      ]
      break
    case 'dark-unica':
      colors = [
        '#2B908F',
        '#90EE7E',
        '#F45B5B',
        '#7798BF',
        '#8085e9',
        '#f15c80',
        '#e4d354',
        '#2b908f',
        '#f45b5b',
        '#91e8e1',
      ]
      break
    case 'grid-light':
      colors = [
        '#7cb5ec',
        '#f7a35c',
        '#90ee7e',
        '#7798BF',
        '#aaeeee',
        '#ff0066',
        '#eeaaee',
        '#55BF3B',
        '#DF5353',
        '#7798BF',
        '#aaeeee',
      ]
      break
    case 'sand-signika':
      colors = [
        '#f45b5b',
        '#8085e9',
        '#8d4654',
        '#7798BF',
        '#aaeeee',
        '#ff0066',
        '#eeaaee',
        '#55BF3B',
        '#DF5353',
        '#7798BF',
        '#aaeeee',
      ]
      break
    default:
      break
  }

  let formatValue = {
    CCR: '%',
    PCR: '%',
    PAYLOAD_TOT: 'PL',
    ERLANGS: 'ERL',
    ERLANG: 'ERL',

  }

  let titleValue = {
    CCR: 'CCR',
    PCR: 'PCR',
    PAYLOAD_TOT: 'PAYLOAD TOTAL',
    ERLANGS: 'ERLANG',
    ERLANG: 'ERLANG',
  }

  let gridLineWidthDerivate = indexKey !== 0 ? 0 : 1

  let opossiteResult = opositeValue(indexKey)
  /*eslint-disable*/
  let textTitle = ''
  return {
    gridLineWidth: gridLineWidthDerivate,
    labels: {
      format: '{value}' + formatValue[value],
      style: {
        color: colors[indexKey],
      },
    },
    title: {
      text: titleValue[value] + textTitle,
      style: {
        color: colors[indexKey],
      },
    },
    opposite: opossiteResult,
    linkedTo: linked,
  }
  /*eslint-enable*/
}

function* getStatisticsMoreDetails() {
  yield takeLatest(
    STATISTICS_REQUESTING_MORE_ALERT_DETAILS,
    getStatisticsMoreDetailsFlow
  )
}

export { getStatisticsMoreDetails }
