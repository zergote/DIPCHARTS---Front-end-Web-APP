import { API_URL_STATISTICS } from '../../client/constants'
import { takeLatest, call, put } from 'redux-saga/effects'
import {
  REGION_REQUESTING_USERS,
  REGION_SUCCESS_USERS,
  STATION_REQUESTING_USERS,
  STATION_SUCCESS_USERS,
  SECTOR_REQUESTING_USERS,
  SECTOR_SUCCESS_USERS,
  STATISTICS_REQUESTING_USERS,
  STATISTICS_SUCCESS_USERS,
  SET_PRELOADER_STATE_USERS,
  SELECTED_REGION_USERS,
  SELECTED_STATION_USERS,
  SELECTED_SECTOR_USERS,
  SET_CONFIG_CLEAN_SERIES_USERS,
  SHOW_STATION_USERS,
  SEARCH_STATION_USERS,
  SHOW_SECTOR_USERS,
  SEARCH_SECTOR_USERS,
} from './constants'

function* getRegionFlow(action) {
  try {
    let { ID_REGION, REGION } = action.value
    let stations = {
      sinconexion: { ID: null, STATION: 'CARGANDO...' },
    }
    yield put({ type: STATION_SUCCESS_USERS, stations })

    let value = false

    yield put({ type: SHOW_STATION_USERS, value })
    yield put({ type: SEARCH_STATION_USERS, value })
    let station = ''
    yield put({ type: SELECTED_STATION_USERS, station })

    yield put({ type: SHOW_SECTOR_USERS, value })
    yield put({ type: SEARCH_SECTOR_USERS, value })
    let sector = ''
    yield put({ type: SELECTED_SECTOR_USERS, sector })

    let groups = ['region', 'subregion']
    let groupSelected = groups[action.groupId]
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

    let apiUrl = API_URL_STATISTICS + '/' + groupSelected
    let received = yield call(fetch, apiUrl, init)
    const regions = yield call([received, 'json'])
    yield put({ type: REGION_SUCCESS_USERS, regions })

    let region = { ID: ID_REGION, REGION: REGION.toUpperCase() }
    yield put({ type: SELECTED_REGION_USERS, region })
  } catch (err) {
    let region = { ID: null, REGION: 'SIN CONEXION' }
    yield put({ type: SELECTED_REGION_USERS, region })
    const regions = { sinconexion: { ID: null, REGION: 'SIN CONEXION' } }
    yield put({ type: REGION_SUCCESS_USERS, regions })
  }
}

function* getStateFlow(action) {
  try {
    const { IDREGION, IDTECHNOLOGY, IDGROUP } = action.value
    let groups = ['region', 'subregion']
    let groupSelected = groups[IDGROUP]
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
      API_URL_STATISTICS +
      '/' +
      groupSelected +
      '/station/' +
      IDREGION +
      '/' +
      IDTECHNOLOGY
    let received = yield call(fetch, apiUrl, init)
    const stations = yield call([received, 'json'])
    yield put({ type: STATION_SUCCESS_USERS, stations })
  } catch (err) {
    let station = { ID: null, STATION: 'SIN CONEXION' }
    yield put({ type: SELECTED_STATION_USERS, station })
    let stations = { sinconexion: { ID: null, STATION: 'SIN CONEXION' } }
    yield put({ type: STATION_SUCCESS_USERS, stations })
  }
}

function* getSectorFlow(action) {
  try {
    const { IDSTATION, IDTECHNOLOGY, IDGROUP } = action.value
    let groups = ['region', 'subregion']
    let groupSelected = groups[IDGROUP]

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
      API_URL_STATISTICS +
      '/' +
      groupSelected +
      '/sector/' +
      IDSTATION +
      '/' +
      IDTECHNOLOGY
    let received = yield call(fetch, apiUrl, init)
    let sectors = yield call([received, 'json'])
    yield put({ type: SECTOR_SUCCESS_USERS, sectors })
  } catch (err) {
    let sector = { ID: null, SECTOR: 'SIN CONEXION' }
    yield put({ type: SELECTED_SECTOR_USERS, sector })
    let sectors = { sinconexion: { ID: null, SECTOR: 'SIN CONEXION' } }
    yield put({ type: SECTOR_SUCCESS_USERS, sectors })
  }
}

function* getStatisticsUSERSFlow(action) {
  let {
    KPISELECTED,
    ACTUALCONFIG,
    THEME,
    TYPECHART,
    IDSECTOR,
    IDSERVICE,
    SINCETHEDATE,
    UNTILTHEDATE,
    REGION,
    STATION,
    SECTOR,
    IDGROUP,
    ADITIONALCHARTOPTIONS,
    SERVICENAME,
  } = action.value

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

  let config = { ...ACTUALCONFIG }
  let groups = ['region', 'subregion']
  let groupSelected = groups[IDGROUP]

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
    USERS_HSDPA: 'USUARIOS HSDP',
    USERS_HSUPA: 'USUARIOS HSUPA',
  }

  let legendValue4G = {
    USERSDL: 'USUARIOS DL',
    USERSUL: 'USUARIOS UL',
  }
  let auxLegendValue = legendValue

  if (STATION !== undefined && SECTOR !== undefined) {
    try {
      let stateFetch = false
      yield put({ type: SET_PRELOADER_STATE_USERS, stateFetch })
      if (KPISELECTED.length > 0) {
        //Construyendo titulo nuevo
        let kpisForTitle = ''
        let separator = KPISELECTED.length === 1 ? '' : ','
        for (let key in KPISELECTED) {
          let element = KPISELECTED[key]
          if (element === 'USERS_HSDPA' && IDSERVICE === 5) {
            element = 'USERSDL'
            auxLegendValue = legendValue4G
          } else if (element === 'USERS_HSUPA' && IDSERVICE === 5) {
            element = 'USERSUL'
            auxLegendValue = legendValue4G
          } else {
            auxLegendValue = legendValue
          }
          kpisForTitle =
            kpisForTitle + auxLegendValue[element] + separator + ' '
        }
        if (KPISELECTED.length > 1) {
          kpisForTitle = kpisForTitle.substring(0, kpisForTitle.length - 2)
        }

        //Asignando titulo a grafica
        config.title = {
          text: 'ESTADISTICA DE ' + kpisForTitle + ' DEL SECTOR ' + SECTOR,
        }

        //Limpiar datos de la grafica anterior
        config.series = []
        config.yAxis = []

        for (let i = 0; i < KPISELECTED.length; i++) {
          let KPINAME = KPISELECTED[i]
          if (KPINAME === 'USERS_HSDPA' && IDSERVICE === 5) {
            KPINAME = 'USERSDL'
            auxLegendValue = legendValue4G
          } else if (KPINAME === 'USERS_HSUPA' && IDSERVICE === 5) {
            KPINAME = 'USERSUL'
            auxLegendValue = legendValue4G
          } else {
            auxLegendValue = legendValue
          }
          let apiUrl =
            API_URL_STATISTICS +
            '/' +
            groupSelected +
            '/sector/' +
            IDSECTOR +
            '/' +
            IDSERVICE +
            '/' +
            KPINAME +
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

          let newYAxis = assignNewYAxis(
            KPINAME,
            i,
            THEME,
            SERVICENAME,
            linkedTo
          )

          let newSerie = {
            type: TYPECHART[i],
            name: auxLegendValue[KPINAME],
            data: receivedToJson,
            yAxis: i,
            tooltip: {
              valueDecimals: 2,
            },
          }
          config.yAxis.push(newYAxis)
          config.series.push(newSerie)
        }
        yield put({ type: STATISTICS_SUCCESS_USERS, config })
        let stateFetch = true
        yield put({ type: SET_PRELOADER_STATE_USERS, stateFetch })
      } else {
        yield put({ type: SET_CONFIG_CLEAN_SERIES_USERS })
      }
    } catch (err) {
      yield put({ type: SET_CONFIG_CLEAN_SERIES_USERS })
      console.log(err)
    }
  } else if (STATION !== undefined) {
    try {
      let stateFetch = false
      yield put({ type: SET_PRELOADER_STATE_USERS, stateFetch })

      if (KPISELECTED.length > 0) {
        //Construyendo titulo nuevo
        let kpisForTitle = ''
        let separator = KPISELECTED.length === 1 ? '' : ','
        for (let key in KPISELECTED) {
          let element = KPISELECTED[key]
          if (element === 'USERS_HSDPA' && IDSERVICE === 5) {
            element = 'USERSDL'
            auxLegendValue = legendValue4G
          } else if (element === 'USERS_HSUPA' && IDSERVICE === 5) {
            element = 'USERSUL'
            auxLegendValue = legendValue4G
          } else {
            auxLegendValue = legendValue
          }
          kpisForTitle =
            kpisForTitle + auxLegendValue[element] + separator + ' '
        }
        if (KPISELECTED.length > 1) {
          kpisForTitle = kpisForTitle.substring(0, kpisForTitle.length - 2)
        }

        //Asignando titulo a grafica
        config.title = {
          text: 'ESTADISTICA DE ' + kpisForTitle + ' DE LA ESTACION ' + STATION,
        }

        //Limpiar datos de la grafica anterior
        config.series = []
        config.yAxis = []

        for (let i = 0; i < KPISELECTED.length; i++) {
          let KPINAME = KPISELECTED[i]
          if (KPINAME === 'USERS_HSDPA' && IDSERVICE === 5) {
            KPINAME = 'USERSDL'
            auxLegendValue = legendValue4G
          } else if (KPINAME === 'USERS_HSUPA' && IDSERVICE === 5) {
            KPINAME = 'USERSUL'
            auxLegendValue = legendValue4G
          } else {
            auxLegendValue = legendValue
          }
          let apiUrl =
            API_URL_STATISTICS +
            '/' +
            groupSelected +
            '/station/' +
            STATION +
            '/' +
            IDSERVICE +
            '/' +
            KPINAME +
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

          let newYAxis = assignNewYAxis(
            KPINAME,
            i,
            THEME,
            SERVICENAME,
            linkedTo
          )

          let newSerie = {
            type: TYPECHART[i],
            name: auxLegendValue[KPINAME],
            data: receivedToJson,
            yAxis: i,
            tooltip: {
              valueDecimals: 2,
            },
          }
          config.yAxis.push(newYAxis)
          config.series.push(newSerie)
        }
        yield put({ type: STATISTICS_SUCCESS_USERS, config })
        let stateFetch = true
        yield put({ type: SET_PRELOADER_STATE_USERS, stateFetch })
      } else {
        yield put({ type: SET_CONFIG_CLEAN_SERIES_USERS })
      }
    } catch (err) {
      yield put({ type: SET_CONFIG_CLEAN_SERIES_USERS })
      console.log(err)
    }
  } else {
    try {
      let controlColorAndOposite = 0
      let stateFetch = false
      yield put({ type: SET_PRELOADER_STATE_USERS, stateFetch })

      if (KPISELECTED.length > 0) {
        //Construyendo titulo nuevo
        let kpisForTitle = ''
        let separator = KPISELECTED.length === 1 ? '' : ','
        for (let key in KPISELECTED) {
          let element = KPISELECTED[key]
          if (element === 'USERS_HSDPA' && IDSERVICE === 5) {
            element = 'USERSDL'
            auxLegendValue = legendValue4G
          } else if (element === 'USERS_HSUPA' && IDSERVICE === 5) {
            element = 'USERSUL'
            auxLegendValue = legendValue4G
          } else {
            auxLegendValue = legendValue
          }
          kpisForTitle =
            kpisForTitle +
            auxLegendValue[element] +
            ' (' +
            SERVICENAME +
            ')' +
            separator +
            ' '
        }
        //Agrega identificador para los kpis que pertenecen a la otra tecnologia
        if (ADITIONALCHARTOPTIONS.column2.kpiSelected.length > 0) {
          for (let key in ADITIONALCHARTOPTIONS.column2.kpiSelected) {
            let element = ADITIONALCHARTOPTIONS.column2.kpiSelected[key]
            if (
              element === 'USERS_HSDPA' &&
              ADITIONALCHARTOPTIONS.column2.service.ID === 5
            ) {
              element = 'USERSDL'
              auxLegendValue = legendValue4G
            } else if (
              element === 'USERS_HSUPA' &&
              ADITIONALCHARTOPTIONS.column2.service.ID === 5
            ) {
              element = 'USERSUL'
              auxLegendValue = legendValue4G
            } else {
              auxLegendValue = legendValue
            }
            kpisForTitle =
              kpisForTitle +
              auxLegendValue[element] +
              ' (' +
              ADITIONALCHARTOPTIONS.column2.service.SERVICE +
              ')' +
              separator +
              ' '
          }
        }

        //Agrega identificador para los kpis que pertenecen a la otra tecnologia
        if (ADITIONALCHARTOPTIONS.column3.kpiSelected.length > 0) {
          for (let key in ADITIONALCHARTOPTIONS.column3.kpiSelected) {
            let element = ADITIONALCHARTOPTIONS.column3.kpiSelected[key]
            if (
              element === 'USERS_HSDPA' &&
              ADITIONALCHARTOPTIONS.column3.service.ID === 5
            ) {
              element = 'USERSDL'
              auxLegendValue = legendValue4G
            }
            if (
              element === 'USERS_HSUPA' &&
              ADITIONALCHARTOPTIONS.column3.service.ID === 5
            ) {
              element = 'USERSUL'
              auxLegendValue = legendValue4G
            } else {
              auxLegendValue = legendValue
            }
            kpisForTitle =
              kpisForTitle +
              auxLegendValue[element] +
              ' (' +
              ADITIONALCHARTOPTIONS.column3.service.SERVICE +
              ')' +
              separator +
              ' '
          }
        }

        if (KPISELECTED.length > 1) {
          kpisForTitle = kpisForTitle.substring(0, kpisForTitle.length - 2)
        }

        //Asignando titulo a grafica
        config.title = {
          text:
            'ESTADISTICA DE ' +
            kpisForTitle +
            ' DE LA ' +
            groupSelected.toUpperCase() +
            ' ' +
            REGION.toUpperCase(),
        }

        //Limpiar datos de la grafica anterior
        config.series = []
        config.yAxis = []

        for (let i = 0; i < KPISELECTED.length; i++) {
          let KPINAME = KPISELECTED[i]
          if (KPINAME === 'USERS_HSDPA' && IDSERVICE === 5) {
            KPINAME = 'USERSDL'
            auxLegendValue = legendValue4G
          } else if (KPINAME === 'USERS_HSUPA' && IDSERVICE === 5) {
            KPINAME = 'USERSUL'
            auxLegendValue = legendValue4G
          } else {
            auxLegendValue = legendValue
          }
          let apiUrl =
            API_URL_STATISTICS +
            '/' +
            groupSelected +
            '/' +
            REGION +
            '/' +
            IDSERVICE +
            '/' +
            KPINAME +
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

          let newYAxis = assignNewYAxis(
            KPINAME,
            controlColorAndOposite,
            THEME,
            SERVICENAME,
            linkedTo
          )

          let newSerie = {
            type: TYPECHART[i],
            name: auxLegendValue[KPINAME] + ' (' + SERVICENAME + ')',
            data: receivedToJson,
            yAxis: i,
            tooltip: {
              valueDecimals: 2,
            },
          }
          config.yAxis.push(newYAxis)
          config.series.push(newSerie)
          controlColorAndOposite++
        }

        if (ADITIONALCHARTOPTIONS.column2.kpiSelected.length > 0) {
          for (
            let i = 0;
            i < ADITIONALCHARTOPTIONS.column2.kpiSelected.length;
            i++
          ) {
            let KPINAME = ADITIONALCHARTOPTIONS.column2.kpiSelected[i]
            if (
              KPINAME === 'USERS_HSDPA' &&
              ADITIONALCHARTOPTIONS.column2.service.ID === 5
            ) {
              KPINAME = 'USERSDL'
              auxLegendValue = legendValue4G
            } else if (
              KPINAME === 'USERS_HSUPA' &&
              ADITIONALCHARTOPTIONS.column2.service.ID === 5
            ) {
              KPINAME = 'USERSUL'
              auxLegendValue = legendValue4G
            } else {
              auxLegendValue = legendValue
            }
            let apiUrl =
              API_URL_STATISTICS +
              '/' +
              groupSelected +
              '/' +
              REGION +
              '/' +
              ADITIONALCHARTOPTIONS.column2.service.ID +
              '/' +
              KPINAME +
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

            let newYAxis = assignNewYAxis(
              KPINAME,
              controlColorAndOposite,
              THEME,
              ADITIONALCHARTOPTIONS.column2.service.SERVICE,
              linkedTo
            )

            let newSerie = {
              type: ADITIONALCHARTOPTIONS.column2.typeChartSelected[i],
              name:
                auxLegendValue[KPINAME] +
                ' (' +
                ADITIONALCHARTOPTIONS.column2.service.SERVICE +
                ')',
              data: receivedToJson,
              yAxis: i,
              tooltip: {
                valueDecimals: 2,
              },
            }
            config.yAxis.push(newYAxis)
            config.series.push(newSerie)
            controlColorAndOposite++
          }
        }

        if (ADITIONALCHARTOPTIONS.column3.kpiSelected.length > 0) {
          for (
            let i = 0;
            i < ADITIONALCHARTOPTIONS.column3.kpiSelected.length;
            i++
          ) {
            let KPINAME = ADITIONALCHARTOPTIONS.column3.kpiSelected[i]
            if (
              KPINAME === 'USERS_HSDPA' &&
              ADITIONALCHARTOPTIONS.column3.service.ID === 5
            ) {
              KPINAME = 'USERSDL'
              auxLegendValue = legendValue4G
            } else if (
              KPINAME === 'USERS_HSUPA' &&
              ADITIONALCHARTOPTIONS.column3.service.ID === 5
            ) {
              KPINAME = 'USERSUL'
              auxLegendValue = legendValue4G
            } else {
              auxLegendValue = legendValue
            }
            let apiUrl =
              API_URL_STATISTICS +
              '/' +
              groupSelected +
              '/' +
              REGION +
              '/' +
              ADITIONALCHARTOPTIONS.column3.service.ID +
              '/' +
              KPINAME +
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

            let newYAxis = assignNewYAxis(
              KPINAME,
              controlColorAndOposite,
              THEME,
              ADITIONALCHARTOPTIONS.column3.service.SERVICE,
              linkedTo
            )

            let newSerie = {
              type: ADITIONALCHARTOPTIONS.column3.typeChartSelected[i],
              name:
                auxLegendValue[KPINAME] +
                ' (' +
                ADITIONALCHARTOPTIONS.column3.service.SERVICE +
                ')',
              data: receivedToJson,
              yAxis: i,
              tooltip: {
                valueDecimals: 2,
              },
            }
            config.yAxis.push(newYAxis)
            config.series.push(newSerie)
            controlColorAndOposite++
          }
        }
        yield put({ type: STATISTICS_SUCCESS_USERS, config })
        let stateFetch = true
        yield put({ type: SET_PRELOADER_STATE_USERS, stateFetch })
      } else {
        yield put({ type: SET_CONFIG_CLEAN_SERIES_USERS })
      }
    } catch (err) {
      yield put({ type: SET_CONFIG_CLEAN_SERIES_USERS })
      console.log(err)
    }
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
function assignNewYAxis(value, indexKey, theme, serviceName, linked) {
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
    USERS_HSDPA: 'Users',
    USERS_HSUPA: 'Users',
    USERSDL: 'Users',
    USERSUL: 'Users',
  }

  let titleValue = {
    USERS_HSDPA: 'Users',
    USERS_HSUPA: 'Users',
    USERSDL: 'Users',
    USERSUL: 'Users',
  }

  let gridLineWidthDerivate = indexKey !== 0 ? 0 : 1

  let opossiteResult = opositeValue(indexKey)
  /*eslint-disable*/
  let textTitle = serviceName === undefined ? '' : ' (' + serviceName + ')'
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

function* getRegionWatcherUSERS() {
  yield takeLatest(REGION_REQUESTING_USERS, getRegionFlow)
}

function* getStationWatcherUSERS() {
  yield takeLatest(STATION_REQUESTING_USERS, getStateFlow)
}

function* getSectorWatcherUSERS() {
  yield takeLatest(SECTOR_REQUESTING_USERS, getSectorFlow)
}

function* getStatisticsWatcherUSERS() {
  yield takeLatest(STATISTICS_REQUESTING_USERS, getStatisticsUSERSFlow)
}

export {
  getRegionWatcherUSERS,
  getStationWatcherUSERS,
  getSectorWatcherUSERS,
  getStatisticsWatcherUSERS,
}
