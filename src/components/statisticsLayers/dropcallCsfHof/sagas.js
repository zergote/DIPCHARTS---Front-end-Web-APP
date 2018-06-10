import { API_URL_STATISTICS } from '../../client/constants'
import { takeLatest, call, put } from 'redux-saga/effects'
import {
  REGION_REQUESTING_DROPCALLCSFHOF,
  REGION_SUCCESS_DROPCALLCSFHOF,
  CLUSTER_REQUESTING_DROPCALLCSFHOF,
  CLUSTER_SUCCESS_DROPCALLCSFHOF,
  STATISTICS_REQUESTING_DROPCALLCSFHOF,
  STATISTICS_SUCCESS_DROPCALLCSFHOF,
  SET_PRELOADER_STATE_DROPCALLCSFHOF,
  SELECTED_REGION_DROPCALLCSFHOF,
  SELECTED_CLUSTER_DROPCALLCSFHOF,
  SET_CONFIG_CLEAN_SERIES_DROPCALLCSFHOF,
  SHOW_CLUSTER_DROPCALLCSFHOF,
  SEARCH_CLUSTER_DROPCALLCSFHOF,
} from './constants'

function* getRegionFlow(action) {
  try {
    let { ID_REGION, REGION } = action.value
    let clusters = {
      sinconexion: { ID: null, CLUST: 'CARGANDO...' },
    }
    yield put({ type: CLUSTER_SUCCESS_DROPCALLCSFHOF, clusters })

    let value = false

    yield put({ type: SHOW_CLUSTER_DROPCALLCSFHOF, value })
    yield put({ type: SEARCH_CLUSTER_DROPCALLCSFHOF, value })
    let cluster = {}
    yield put({ type: SELECTED_CLUSTER_DROPCALLCSFHOF, cluster })

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
    yield put({ type: REGION_SUCCESS_DROPCALLCSFHOF, regions })
    let region = { ID: ID_REGION, REGION: REGION.toUpperCase() }
    yield put({ type: SELECTED_REGION_DROPCALLCSFHOF, region })
  } catch (err) {
    let region = { ID: null, REGION: 'SIN CONEXION' }
    yield put({ type: SELECTED_REGION_DROPCALLCSFHOF, region })
    const regions = { sinconexion: { ID: null, REGION: 'SIN CONEXION' } }
    yield put({ type: REGION_SUCCESS_DROPCALLCSFHOF, regions })
  }
}

function* getClusterFlow(action) {
  try {
    const { IDREGION, IDGROUP } = action.value
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
      API_URL_STATISTICS + '/' + groupSelected + '/cluster/' + IDREGION
    let received = yield call(fetch, apiUrl, init)
    const clusters = yield call([received, 'json'])
    yield put({ type: CLUSTER_SUCCESS_DROPCALLCSFHOF, clusters })
  } catch (err) {
    let cluster = { ID: null, CLUST: 'SIN CONEXION' }
    yield put({ type: SELECTED_CLUSTER_DROPCALLCSFHOF, cluster })
    let clusters = { sinconexion: { ID: null, CLUST: 'SIN CONEXION' } }
    yield put({ type: CLUSTER_SUCCESS_DROPCALLCSFHOF, clusters })
  }
}

function* getStatisticsDROPCALLCSFHOFFlow(action) {
  let {
    KPISELECTED,
    ACTUALCONFIG,
    THEME,
    TYPECHART,
    IDSERVICE,
    SINCETHEDATE,
    UNTILTHEDATE,
    REGION,
    CLUSTER,
    IDGROUP,
    ADITIONALCHARTOPTIONS,
    SERVICENAME,
  } = action.value
  let config = { ...ACTUALCONFIG }
  let groups = ['region', 'subregion']
  let groupSelected = groups[IDGROUP]

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
    DROP_CALLS: 'DROP CALLS',
    CSF: 'CFS',
    HOF: 'HOF',
  }

  if (CLUSTER !== undefined) {
    try {
      let stateFetch = false
      yield put({ type: SET_PRELOADER_STATE_DROPCALLCSFHOF, stateFetch })

      if (KPISELECTED.length > 0) {
        //Construyendo titulo nuevo
        let kpisForTitle = ''
        let separator = KPISELECTED.length === 1 ? '' : ','
        for (let key in KPISELECTED) {
          let element = KPISELECTED[key]
          kpisForTitle = kpisForTitle + legendValue[element] + separator + ' '
        }
        if (KPISELECTED.length > 1) {
          kpisForTitle = kpisForTitle.substring(0, kpisForTitle.length - 2)
        }

        //Asignando titulo a grafica
        config.title = {
          text: 'ESTADISTICA DE ' + kpisForTitle + ' DEL CLUSTER ' + CLUSTER,
        }

        //Limpiar datos de la grafica anterior
        config.series = []
        config.yAxis = []

        for (let i = 0; i < KPISELECTED.length; i++) {
          let KPINAME = KPISELECTED[i]
          if (KPINAME === 'DROP_CALLS' && SERVICENAME === '3G') IDSERVICE = 3
          let apiUrl =
            API_URL_STATISTICS +
            '/cluster/' +
            CLUSTER +
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
            name: legendValue[KPINAME],
            data: receivedToJson,
            yAxis: i,
            tooltip: {
              valueDecimals: 2,
            },
          }
          config.yAxis.push(newYAxis)
          config.series.push(newSerie)
        }
        yield put({ type: STATISTICS_SUCCESS_DROPCALLCSFHOF, config })
        let stateFetch = true
        yield put({ type: SET_PRELOADER_STATE_DROPCALLCSFHOF, stateFetch })
      } else {
        yield put({ type: SET_CONFIG_CLEAN_SERIES_DROPCALLCSFHOF })
      }
    } catch (err) {
      yield put({ type: SET_CONFIG_CLEAN_SERIES_DROPCALLCSFHOF })
      console.log(err)
    }
  } else {
    try {
      let controlColorAndOposite = 0
      let stateFetch = false
      yield put({ type: SET_PRELOADER_STATE_DROPCALLCSFHOF, stateFetch })

      if (KPISELECTED.length >= 0) {
        //Construyendo titulo nuevo
        let kpisForTitle = ''
        let separator = KPISELECTED.length === 1 ? '' : ','
        for (let key in KPISELECTED) {
          kpisForTitle =
            kpisForTitle +
            legendValue[KPISELECTED[key]] +
            ' (' +
            SERVICENAME +
            ')' +
            separator +
            ' '
        }

        //Agrega identificador para los kpis que pertenecen a la otra tecnologia
        if (ADITIONALCHARTOPTIONS.column2.kpiSelected.length >= 0) {
          for (let key in ADITIONALCHARTOPTIONS.column2.kpiSelected) {
            kpisForTitle =
              kpisForTitle +
              legendValue[ADITIONALCHARTOPTIONS.column2.kpiSelected[key]] +
              ' (' +
              ADITIONALCHARTOPTIONS.column2.service.SERVICE +
              ') ' +
              separator +
              ' '
          }
        }

        //Agrega identificador para los kpis que pertenecen a la otra tecnologia
        if (ADITIONALCHARTOPTIONS.column3.kpiSelected.length >= 0) {
          for (let key in ADITIONALCHARTOPTIONS.column3.kpiSelected) {
            kpisForTitle =
              kpisForTitle +
              legendValue[ADITIONALCHARTOPTIONS.column3.kpiSelected[key]] +
              ' (' +
              ADITIONALCHARTOPTIONS.column3.service.SERVICE +
              ') ' +
              separator +
              ' '
          }
        }

        if (KPISELECTED.length >= 1) {
          kpisForTitle = kpisForTitle.substring(0, kpisForTitle.length - 1)
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
          if (KPINAME === 'DROP_CALLS' && SERVICENAME === '3G') IDSERVICE = 3
          let apiUrl =
            API_URL_STATISTICS +
            '/cluster/' +
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
            name: legendValue[KPINAME] + ' (' + SERVICENAME + ')',
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
              KPINAME === 'DROP_CALLS' &&
              ADITIONALCHARTOPTIONS.column2.service.SERVICE === '3G'
            )
              IDSERVICE = 3

            IDSERVICE = ADITIONALCHARTOPTIONS.column2.service.ID

            let apiUrl =
              API_URL_STATISTICS +
              '/cluster/' +
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
            console.log(apiUrl)
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
                legendValue[KPINAME] +
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
              KPINAME === 'DROP_CALLS' &&
              ADITIONALCHARTOPTIONS.column3.service.SERVICE === '3G'
            )
              IDSERVICE = 3

            IDSERVICE = ADITIONALCHARTOPTIONS.column3.service.ID
            let apiUrl =
              API_URL_STATISTICS +
              '/cluster' +
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
              ADITIONALCHARTOPTIONS.column3.service.SERVICE,
              linkedTo
            )

            let newSerie = {
              type: ADITIONALCHARTOPTIONS.column3.typeChartSelected[i],
              name:
                legendValue[KPINAME] +
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
        yield put({ type: STATISTICS_SUCCESS_DROPCALLCSFHOF, config })
        let stateFetch = true
        yield put({ type: SET_PRELOADER_STATE_DROPCALLCSFHOF, stateFetch })
      } else {
        yield put({ type: SET_CONFIG_CLEAN_SERIES_DROPCALLCSFHOF })
      }
    } catch (err) {
      yield put({ type: SET_CONFIG_CLEAN_SERIES_DROPCALLCSFHOF })
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
    DROP_CALLS: '%',
    CSF: '%',
    HOF: '%',
  }

  let titleValue = {
    DROP_CALLS: 'DROP CALLS',
    CSF: 'CFS',
    HOF: 'HOF',
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

function* getRegionWatcherDROPCALLCSFHOF() {
  yield takeLatest(REGION_REQUESTING_DROPCALLCSFHOF, getRegionFlow)
}

function* getClusterWatcherDROPCALLCSFHOF() {
  yield takeLatest(CLUSTER_REQUESTING_DROPCALLCSFHOF, getClusterFlow)
}

function* getStatisticsWatcherDROPCALLCSFHOF() {
  yield takeLatest(
    STATISTICS_REQUESTING_DROPCALLCSFHOF,
    getStatisticsDROPCALLCSFHOFFlow
  )
}

export {
  getRegionWatcherDROPCALLCSFHOF,
  getClusterWatcherDROPCALLCSFHOF,
  getStatisticsWatcherDROPCALLCSFHOF,
}
