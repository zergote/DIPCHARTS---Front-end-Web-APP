import { API_URL_STATISTICS } from '../../client/constants'
import { takeLatest, call, put } from 'redux-saga/effects'
import {
  REGION_REQUESTING_CLUSTERS,
  REGION_SUCCESS_CLUSTERS,
  CLUSTERS_REQUESTING,
  CLUSTERS_SUCCESS,
  STATISTICS_REQUESTING_CLUSTERS_ERLANG,
  STATISTICS_SUCCESS_CLUSTERS_ERLANG,
  SET_PRELOADER_STATE_CLUSTERS_ERLANG,
  SELECTED_REGION_CLUSTERS,
  SELECTED_CLUSTER,
  SET_CONFIG_CLEAN_SERIES_CLUSTERS_ERLANG,
  SHOW_CLUSTER,
  SEARCH_CLUSTERS,
  STATISTICS_SUCCESS_CLUSTERS_PAYLOAD,
  SET_PRELOADER_STATE_CLUSTERS_PAYLOAD,
  SET_CONFIG_CLEAN_SERIES_CLUSTERS_PAYLOAD,
  STATISTICS_REQUESTING_CLUSTERS_PAYLOAD,
  STATISTICS_SUCCESS_CLUSTERS_CCR,
  SET_PRELOADER_STATE_CLUSTERS_CCR,
  SET_CONFIG_CLEAN_SERIES_CLUSTERS_CCR,
  STATISTICS_REQUESTING_CLUSTERS_CCR,
  STATISTICS_SUCCESS_CLUSTERS_PCR,
  SET_PRELOADER_STATE_CLUSTERS_PCR,
  SET_CONFIG_CLEAN_SERIES_CLUSTERS_PCR,
  STATISTICS_REQUESTING_CLUSTERS_PCR,
  STATISTICS_SUCCESS_CLUSTERS_USERS,
  SET_PRELOADER_STATE_CLUSTERS_USERS,
  SET_CONFIG_CLEAN_SERIES_CLUSTERS_USERS,
  STATISTICS_REQUESTING_CLUSTERS_USERS,
  STATISTICS_REQUESTING_CLUSTERS_CONSULT,
  SET_PRELOADER_STATE_CLUSTERS_CONSULT,
  STATISTICS_SUCCESS_CLUSTERS_CONSULT,
  SET_CONFIG_CLEAN_SERIES_CLUSTERS_CONSULT,
} from './constants'

function* getRegionFlow(action) {
  try {
    let { ID_REGION, REGION } = action.value
    let clusters = {
      sinconexion: { ID: null, CLUST: 'CARGANDO...' },
    }
    yield put({ type: CLUSTERS_SUCCESS, clusters })

    let value = false

    yield put({ type: SHOW_CLUSTER, value })
    yield put({ type: SEARCH_CLUSTERS, value })
    let cluster = ''
    yield put({ type: SELECTED_CLUSTER, cluster })

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
    yield put({ type: REGION_SUCCESS_CLUSTERS, regions })
    let region = { ID: ID_REGION, REGION: REGION.toUpperCase() }
    yield put({ type: SELECTED_REGION_CLUSTERS, region })
  } catch (err) {
    let region = { ID: null, REGION: 'SIN CONEXION' }
    yield put({ type: SELECTED_REGION_CLUSTERS, region })
    const regions = { sinconexion: { ID: null, REGION: 'SIN CONEXION' } }
    yield put({ type: REGION_SUCCESS_CLUSTERS, regions })
  }
}

function* getClusterFlow(action) {
  try {
    const { IDREGION, IDGROUP } = action

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
    yield put({ type: CLUSTERS_SUCCESS, clusters })
    let value = true
    yield put({ type: SEARCH_CLUSTERS, value })
    yield put({ type: SHOW_CLUSTER, value })
  } catch (err) {
    console.log(err)
    let cluster = { ID: null, CLUST: 'SIN CONEXION' }
    yield put({ type: SELECTED_CLUSTER, cluster })
    let clusters = { sinconexion: { ID: null, CLUST: 'SIN CONEXION' } }
    yield put({ type: CLUSTERS_SUCCESS, clusters })
  }
}

function* getStatisticsConsultFlow(action) {
  try {
    let {
      KPISELECTED,
      ACTUALCONFIG,
      ADITIONALCHARTOPTIONS,
      TYPECHART,
      THEME,
      SINCETHEDATE,
      UNTILTHEDATE,
      CLUSTER,
      REGION,
      IDGROUP,
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

    let IDSERVICE = 1
    let SERVICENAME = '2G'

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
      CCR: 'CCR',
      PCR: 'PCR',
      ERLANGS: 'ERLANG',
      ERLANG: 'ERLANG',
      PAYLOAD_TOT: 'PL',
      USERS_HSDPA: 'USUARIOS HSDPA',
      USERS_HSUPA: 'USUARIOS HSUPA',
      USERSDL: 'USUARIOS DL',
      USERSUL: 'USUARIOS UL',
    }

    let controlColorAndOposite = 0
    let stateFetch = false
    yield put({ type: SET_PRELOADER_STATE_CLUSTERS_CONSULT, stateFetch })

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
      if (ADITIONALCHARTOPTIONS.column2.kpiSelected.length > 0) {
        for (let key in ADITIONALCHARTOPTIONS.column2.kpiSelected) {
          kpisForTitle =
            kpisForTitle +
            legendValue[ADITIONALCHARTOPTIONS.column2.kpiSelected[key]] +
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
          kpisForTitle =
            kpisForTitle +
            legendValue[ADITIONALCHARTOPTIONS.column3.kpiSelected[key]] +
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
          kpisForTitle +
          '>' +
          CLUSTER.toUpperCase() +
          ' [' +
          REGION.toUpperCase() +
          ']',
      }
      //Limpiar datos de la grafica anterior
      config.series = []
      config.yAxis = []

      for (let i = 0; i < KPISELECTED.length; i++) {
        let KPINAME = KPISELECTED[i]
        if (KPINAME === 'PAYLOAD_TOT' && IDSERVICE === 1) {
          IDSERVICE = 2
        } else if (KPINAME === 'PCR' && IDSERVICE === 1) {
          IDSERVICE = 2
        } else {
          IDSERVICE = 1
        }

        //subregion/
        let apiUrl =
          API_URL_STATISTICS +
          '/perfinfocluster/' +
          groupSelected +
          '/' +
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
          let idServiceColumn2 = ADITIONALCHARTOPTIONS.column2.service.ID
          let KPINAME = ADITIONALCHARTOPTIONS.column2.kpiSelected[i]
          if (
            KPINAME === 'ERLANG' &&
            ADITIONALCHARTOPTIONS.column2.service.ID === 3
          )
            KPINAME = 'ERLANGS'
          if (
            KPINAME === 'PAYLOAD_TOT' &&
            ADITIONALCHARTOPTIONS.column2.service.ID === 3
          ) {
            idServiceColumn2 = 4
          }
          if (
            KPINAME === 'PCR' &&
            ADITIONALCHARTOPTIONS.column2.service.ID === 3
          ) {
            idServiceColumn2 = 4
          }
          if (
            KPINAME === 'USERS_HSDPA' &&
            ADITIONALCHARTOPTIONS.column2.service.ID === 3
          ) {
            idServiceColumn2 = 4
          }
          if (
            KPINAME === 'USERS_HSUPA' &&
            ADITIONALCHARTOPTIONS.column2.service.ID === 3
          ) {
            idServiceColumn2 = 4
          }
          let apiUrl =
            API_URL_STATISTICS +
            '/perfinfocluster/' +
            groupSelected +
            '/' +
            CLUSTER +
            '/' +
            idServiceColumn2 +
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
            KPINAME === 'USERS_HSDPA' &&
            ADITIONALCHARTOPTIONS.column3.service.ID === 5
          ) {
            KPINAME = 'USERSDL'
          } else if (
            KPINAME === 'USERS_HSUPA' &&
            ADITIONALCHARTOPTIONS.column3.service.ID === 5
          ) {
            KPINAME = 'USERSUL'
          }

          let apiUrl =
            API_URL_STATISTICS +
            '/perfinfocluster/' +
            groupSelected +
            '/' +
            CLUSTER +
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
      yield put({ type: STATISTICS_SUCCESS_CLUSTERS_CONSULT, config })
      let stateFetch = true
      yield put({ type: SET_PRELOADER_STATE_CLUSTERS_CONSULT, stateFetch })
    } else {
      yield put({ type: SET_CONFIG_CLEAN_SERIES_CLUSTERS_CONSULT })
    }
  } catch (err) {
    yield put({ type: SET_CONFIG_CLEAN_SERIES_CLUSTERS_CONSULT })
    console.log(err)
  }
}

function* getStatisticsErlangFlow(action) {
  try {
    let {
      KPISELECTED,
      ACTUALCONFIG,
      ADITIONALCHARTOPTIONS,
      TYPECHART,
      THEME,
      SINCETHEDATE,
      UNTILTHEDATE,
      CLUSTER,
      REGION,
      IDGROUP,
    } = action.value
    let IDSERVICE = 1
    let SERVICENAME = '2G'

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
      ERLANGS: 'ERLANG',
      ERLANG: 'ERLANG',
    }
    let controlColorAndOposite = 0
    let stateFetch = false
    yield put({ type: SET_PRELOADER_STATE_CLUSTERS_ERLANG, stateFetch })

    if (KPISELECTED.length > 0) {
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
      if (ADITIONALCHARTOPTIONS.column2.kpiSelected.length > 0) {
        for (let key in ADITIONALCHARTOPTIONS.column2.kpiSelected) {
          kpisForTitle =
            kpisForTitle +
            legendValue[ADITIONALCHARTOPTIONS.column2.kpiSelected[key]] +
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
          kpisForTitle =
            kpisForTitle +
            legendValue[ADITIONALCHARTOPTIONS.column3.kpiSelected[key]] +
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
          'ERLANG>' + CLUSTER.toUpperCase() + ' [' + REGION.toUpperCase() + ']',
      }
      //Limpiar datos de la grafica anterior
      config.series = []
      config.yAxis = []

      for (let i = 0; i < KPISELECTED.length; i++) {
        let KPINAME = KPISELECTED[i]
        if (KPINAME === 'ERLANG' && IDSERVICE === 3) KPINAME = 'ERLANGS'
        let apiUrl =
          API_URL_STATISTICS +
          '/perfinfocluster/' +
          groupSelected +
          '/' +
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
            KPINAME === 'ERLANG' &&
            ADITIONALCHARTOPTIONS.column2.service.ID === 3
          )
            KPINAME = 'ERLANGS'
          let apiUrl =
            API_URL_STATISTICS +
            '/perfinfocluster/' +
            groupSelected +
            '/' +
            CLUSTER +
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

          let newYAxis = assignNewYAxis(
            KPINAME,
            controlColorAndOposite,
            THEME,
            ADITIONALCHARTOPTIONS.column2.service.SERVICE
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
            KPINAME === 'ERLANG' &&
            ADITIONALCHARTOPTIONS.column3.service.ID === 3
          )
            KPINAME = 'ERLANGS'
          let apiUrl =
            API_URL_STATISTICS +
            '/perfinfocluster/' +
            groupSelected +
            '/' +
            CLUSTER +
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
      yield put({ type: STATISTICS_SUCCESS_CLUSTERS_ERLANG, config })
      let stateFetch = true
      yield put({ type: SET_PRELOADER_STATE_CLUSTERS_ERLANG, stateFetch })
    } else {
      yield put({ type: SET_CONFIG_CLEAN_SERIES_CLUSTERS_ERLANG })
    }
  } catch (err) {
    yield put({ type: SET_CONFIG_CLEAN_SERIES_CLUSTERS_ERLANG })
    console.log(err)
  }
}

function* getStatisticsPayloadFlow(action) {
  try {
    let {
      KPISELECTED,
      ACTUALCONFIG,
      ADITIONALCHARTOPTIONS,
      TYPECHART,
      THEME,
      SINCETHEDATE,
      UNTILTHEDATE,
      CLUSTER,
      REGION,
      IDGROUP,
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

    let IDSERVICE = 2
    let SERVICENAME = '2G'

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
      PAYLOAD_TOT: 'PL',
    }
    let controlColorAndOposite = 0
    let stateFetch = false
    yield put({ type: SET_PRELOADER_STATE_CLUSTERS_PAYLOAD, stateFetch })

    if (KPISELECTED.length > 0) {
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
      if (ADITIONALCHARTOPTIONS.column2.kpiSelected.length > 0) {
        for (let key in ADITIONALCHARTOPTIONS.column2.kpiSelected) {
          kpisForTitle =
            kpisForTitle +
            legendValue[ADITIONALCHARTOPTIONS.column2.kpiSelected[key]] +
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
          kpisForTitle =
            kpisForTitle +
            legendValue[ADITIONALCHARTOPTIONS.column3.kpiSelected[key]] +
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
          'PAYLOAD>' +
          CLUSTER.toUpperCase() +
          ' [' +
          REGION.toUpperCase() +
          ']',
      }
      //Limpiar datos de la grafica anterior
      config.series = []
      config.yAxis = []

      for (let i = 0; i < KPISELECTED.length; i++) {
        let KPINAME = KPISELECTED[i]
        let apiUrl =
          API_URL_STATISTICS +
          '/perfinfocluster/' +
          groupSelected +
          '/' +
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
          let apiUrl =
            API_URL_STATISTICS +
            '/perfinfocluster/' +
            groupSelected +
            '/' +
            CLUSTER +
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
          let apiUrl =
            API_URL_STATISTICS +
            '/perfinfocluster/' +
            groupSelected +
            '/' +
            CLUSTER +
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
      yield put({ type: STATISTICS_SUCCESS_CLUSTERS_PAYLOAD, config })
      let stateFetch = true
      yield put({ type: SET_PRELOADER_STATE_CLUSTERS_PAYLOAD, stateFetch })
    } else {
      yield put({ type: SET_CONFIG_CLEAN_SERIES_CLUSTERS_PAYLOAD })
    }
  } catch (err) {
    yield put({ type: SET_CONFIG_CLEAN_SERIES_CLUSTERS_PAYLOAD })
    console.log(err)
  }
}

function* getStatisticsCcrFlow(action) {
  try {
    let {
      KPISELECTED,
      ACTUALCONFIG,
      ADITIONALCHARTOPTIONS,
      TYPECHART,
      THEME,
      SINCETHEDATE,
      UNTILTHEDATE,
      CLUSTER,
      REGION,
      IDGROUP,
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

    let IDSERVICE = 1
    let SERVICENAME = '2G'

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
      CCR: 'CCR',
    }
    let controlColorAndOposite = 0
    let stateFetch = false
    yield put({ type: SET_PRELOADER_STATE_CLUSTERS_CCR, stateFetch })

    if (KPISELECTED.length > 0) {
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
      if (ADITIONALCHARTOPTIONS.column2.kpiSelected.length > 0) {
        for (let key in ADITIONALCHARTOPTIONS.column2.kpiSelected) {
          kpisForTitle =
            kpisForTitle +
            legendValue[ADITIONALCHARTOPTIONS.column2.kpiSelected[key]] +
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
          kpisForTitle =
            kpisForTitle +
            legendValue[ADITIONALCHARTOPTIONS.column3.kpiSelected[key]] +
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
          'CCR>' + CLUSTER.toUpperCase() + ' [' + REGION.toUpperCase() + ']',
      }
      //Limpiar datos de la grafica anterior
      config.series = []
      config.yAxis = []

      for (let i = 0; i < KPISELECTED.length; i++) {
        let KPINAME = KPISELECTED[i]
        let apiUrl =
          API_URL_STATISTICS +
          '/perfinfocluster/' +
          groupSelected +
          '/' +
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
          IDSERVICE = ADITIONALCHARTOPTIONS.column2.service.ID
          let apiUrl =
            API_URL_STATISTICS +
            '/perfinfocluster/' +
            groupSelected +
            '/' +
            CLUSTER +
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
          IDSERVICE = ADITIONALCHARTOPTIONS.column3.service.ID
          let apiUrl =
            API_URL_STATISTICS +
            '/perfinfocluster/' +
            groupSelected +
            '/' +
            CLUSTER +
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
      yield put({ type: STATISTICS_SUCCESS_CLUSTERS_CCR, config })
      let stateFetch = true
      yield put({ type: SET_PRELOADER_STATE_CLUSTERS_CCR, stateFetch })
    } else {
      yield put({ type: SET_CONFIG_CLEAN_SERIES_CLUSTERS_CCR })
    }
  } catch (err) {
    yield put({ type: SET_CONFIG_CLEAN_SERIES_CLUSTERS_CCR })
    console.log(err)
  }
}

function* getStatisticsPcrFlow(action) {
  try {
    let {
      KPISELECTED,
      ACTUALCONFIG,
      ADITIONALCHARTOPTIONS,
      TYPECHART,
      THEME,
      SINCETHEDATE,
      UNTILTHEDATE,
      CLUSTER,
      REGION,
      IDGROUP,
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

    let IDSERVICE = 2
    let SERVICENAME = '2G'

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
      PCR: 'PCR',
    }
    let controlColorAndOposite = 0
    let stateFetch = false
    yield put({ type: SET_PRELOADER_STATE_CLUSTERS_PCR, stateFetch })

    if (KPISELECTED.length > 0) {
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
      if (ADITIONALCHARTOPTIONS.column2.kpiSelected.length > 0) {
        for (let key in ADITIONALCHARTOPTIONS.column2.kpiSelected) {
          kpisForTitle =
            kpisForTitle +
            legendValue[ADITIONALCHARTOPTIONS.column2.kpiSelected[key]] +
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
          kpisForTitle =
            kpisForTitle +
            legendValue[ADITIONALCHARTOPTIONS.column3.kpiSelected[key]] +
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
          'PCR>' + CLUSTER.toUpperCase() + ' [' + REGION.toUpperCase() + ']',
      }
      //Limpiar datos de la grafica anterior
      config.series = []
      config.yAxis = []

      for (let i = 0; i < KPISELECTED.length; i++) {
        let KPINAME = KPISELECTED[i]
        let apiUrl =
          API_URL_STATISTICS +
          '/perfinfocluster/' +
          groupSelected +
          '/' +
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
          IDSERVICE = ADITIONALCHARTOPTIONS.column2.service.ID
          let apiUrl =
            API_URL_STATISTICS +
            '/perfinfocluster/' +
            groupSelected +
            '/' +
            CLUSTER +
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
          IDSERVICE = ADITIONALCHARTOPTIONS.column3.service.ID
          let apiUrl =
            API_URL_STATISTICS +
            '/perfinfocluster/' +
            groupSelected +
            '/' +
            CLUSTER +
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
      yield put({ type: STATISTICS_SUCCESS_CLUSTERS_PCR, config })
      let stateFetch = true
      yield put({ type: SET_PRELOADER_STATE_CLUSTERS_PCR, stateFetch })
    } else {
      yield put({ type: SET_CONFIG_CLEAN_SERIES_CLUSTERS_PCR })
    }
  } catch (err) {
    yield put({ type: SET_CONFIG_CLEAN_SERIES_CLUSTERS_PCR })
    console.log(err)
  }
}

function* getStatisticsUsersFlow(action) {
  try {
    let {
      KPISELECTED,
      ACTUALCONFIG,
      ADITIONALCHARTOPTIONS,
      TYPECHART,
      THEME,
      SINCETHEDATE,
      UNTILTHEDATE,
      CLUSTER,
      REGION,
      IDGROUP,
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

    let IDSERVICE = 4
    let SERVICENAME = '3G'

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
    let controlColorAndOposite = 0
    let stateFetch = false
    yield put({ type: SET_PRELOADER_STATE_CLUSTERS_USERS, stateFetch })

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
          'USUARIOS>' +
          CLUSTER.toUpperCase() +
          ' [' +
          REGION.toUpperCase() +
          ']',
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
          '/perfinfocluster/' +
          groupSelected +
          '/' +
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
            '/perfinfocluster/' +
            groupSelected +
            '/' +
            CLUSTER +
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
            '/perfinfocluster/' +
            groupSelected +
            '/' +
            CLUSTER +
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
      yield put({ type: STATISTICS_SUCCESS_CLUSTERS_USERS, config })
      let stateFetch = true
      yield put({ type: SET_PRELOADER_STATE_CLUSTERS_USERS, stateFetch })
    } else {
      yield put({ type: SET_CONFIG_CLEAN_SERIES_CLUSTERS_USERS })
    }
  } catch (err) {
    yield put({ type: SET_CONFIG_CLEAN_SERIES_CLUSTERS_PCR })
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

  /*let titleValue = {
    CCR: 'CCR',
    PCR: 'PCR',
    ERLANGS: 'ERLANG',
    ERLANG: 'ERLANG',
    PAYLOAD_TOT: 'megabytes',
    THROUGHPUT_HSDPA: 'kbps',
    THROUGHPUTDL_KBPS: 'kbps',
    USERS_HSDPA: 'Users',
    USERS_HSUPA: 'Users',
    USERSDL: 'Users',
    USERSUL: 'Users'
  }
*/
  let gridLineWidthDerivate = indexKey !== 0 ? 0 : 1

  let opossiteResult = opositeValue(indexKey)
  /*eslint-disable*/
  let textTitle = serviceName === undefined ? '' : ' (' + serviceName + ')'
  return {
    gridLineWidth: gridLineWidthDerivate,
    labels: {
      //enabled: false,
      //format: null,
      format: '{value}' + formatValue[value],
      style: {
        color: colors[indexKey],
      },
    },
    title: {
      //text: titleValue[value] + textTitle,
      text: null,
      style: {
        color: colors[indexKey],
      },
    },
    opposite: opossiteResult,
    linkedTo: linked,
  }
  /*eslint-enable*/
}

function* getRegionWatcherClusters() {
  yield takeLatest(REGION_REQUESTING_CLUSTERS, getRegionFlow)
}

function* getClusterWatcherClusters() {
  yield takeLatest(CLUSTERS_REQUESTING, getClusterFlow)
}

function* getStatisticsWatcherClustersErlang() {
  yield takeLatest(
    STATISTICS_REQUESTING_CLUSTERS_ERLANG,
    getStatisticsErlangFlow
  )
}

function* getStatisticsWatcherClustersPayload() {
  yield takeLatest(
    STATISTICS_REQUESTING_CLUSTERS_PAYLOAD,
    getStatisticsPayloadFlow
  )
}

function* getStatisticsWatcherClustersCcr() {
  yield takeLatest(STATISTICS_REQUESTING_CLUSTERS_CCR, getStatisticsCcrFlow)
}

function* getStatisticsWatcherClustersPcr() {
  yield takeLatest(STATISTICS_REQUESTING_CLUSTERS_PCR, getStatisticsPcrFlow)
}

function* getStatisticsWatcherClustersUsers() {
  yield takeLatest(STATISTICS_REQUESTING_CLUSTERS_USERS, getStatisticsUsersFlow)
}

function* getStatisticsWatcherClustersConsult() {
  yield takeLatest(
    STATISTICS_REQUESTING_CLUSTERS_CONSULT,
    getStatisticsConsultFlow
  )
}
export {
  getRegionWatcherClusters,
  getClusterWatcherClusters,
  getStatisticsWatcherClustersErlang,
  getStatisticsWatcherClustersPayload,
  getStatisticsWatcherClustersCcr,
  getStatisticsWatcherClustersPcr,
  getStatisticsWatcherClustersUsers,
  getStatisticsWatcherClustersConsult,
}
