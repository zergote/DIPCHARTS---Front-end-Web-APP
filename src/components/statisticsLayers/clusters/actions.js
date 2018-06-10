import {
  SET_STATE_CHART_OPTIONS_CLUSTERS_ERLANG,
  SET_STATE_CHART_OPTIONS_CLUSTERS_PAYLOAD,
  SET_STATE_CHART_OPTIONS_CLUSTERS_CCR,
  SET_STATE_CHART_OPTIONS_CLUSTERS_PCR,
  SET_STATE_CHART_OPTIONS_CLUSTERS_USERS,
  SET_PRELOADER_STATE_CLUSTERS_ERLANG,
  SET_PRELOADER_STATE_CLUSTERS_PAYLOAD,
  SET_PRELOADER_STATE_CLUSTERS_CCR,
  SET_PRELOADER_STATE_CLUSTERS_PCR,
  SET_PRELOADER_STATE_CLUSTERS_USERS,
  //Breadcrumb constants
  MENU_SELECTOR_LAPSE_CLUSTERS,
  MODAL_CALENDAR_CLUSTERS,
  SET_CALENDAR_DATE_START_CLUSTERS,
  SET_CALENDAR_DATE_END_CLUSTERS,
  SET_SELECTED_TIME_LAPSE_CLUSTERS,
  SHOW_CLUSTER,
  SEARCH_CLUSTERS,
  CLUSTERS_SUGGESTIONS,
  SELECTED_CLUSTER,
  SHOW_REGION_CLUSTERS,
  SEARCH_REGION_CLUSTERS,
  REGION_SUGGESTIONS_CLUSTERS,
  SELECTED_REGION_CLUSTERS,
  REGION_INPUT_CHANGE_CLUSTERS,
  CLUSTERS_INPUT_CHANGE,
  REGION_REQUESTING_CLUSTERS,
  REGION_SUCCESS_CLUSTERS,
  CLUSTERS_REQUESTING,
  CLUSTERS_SUCCESS,
  STATISTICS_REQUESTING_CLUSTERS_ERLANG,
  STATISTICS_REQUESTING_CLUSTERS_PAYLOAD,
  STATISTICS_REQUESTING_CLUSTERS_CCR,
  STATISTICS_REQUESTING_CLUSTERS_PCR,
  STATISTICS_REQUESTING_CLUSTERS_USERS,
  STATISTICS_SUCCESS_CLUSTERS_ERLANG,
  STATISTICS_SUCCESS_CLUSTERS_PAYLOAD,
  STATISTICS_SUCCESS_CLUSTERS_CCR,
  STATISTICS_SUCCESS_CLUSTERS_PCR,
  STATISTICS_SUCCESS_CLUSTERS_USERS,
  SET_CHART_OPTIONS_CLUSTERS_ERLANG,
  SET_CHART_OPTIONS_CLUSTERS_PAYLOAD,
  SET_CHART_OPTIONS_CLUSTERS_CCR,
  SET_CHART_OPTIONS_CLUSTERS_PCR,
  SET_CHART_OPTIONS_CLUSTERS_USERS,
  SELECTED_GROUP_CLUSTERS,
  SET_STATE_GROUP_MENU_CLUSTERS,
  CHANGE_CONSULT_STATE_CLUSTERS,
  SET_CHART_OPTIONS_CLUSTERS_CONSULT,
  SET_STATE_CHART_OPTIONS_CLUSTERS_CONSULT,
  SELECTED_SERVICE_CLUSTERS_CONSULT,
  STATISTICS_REQUESTING_CLUSTERS_CONSULT,
  STATISTICS_SUCCESS_CLUSTERS_CONSULT,
} from './constants.js'

const setStateChartOptionsErlang = function setStateChartOptionsErlang(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_CLUSTERS_ERLANG,
    value,
  }
}
const setStateChartOptionsPayload = function setStateChartOptionsPayload(
  value
) {
  return {
    type: SET_STATE_CHART_OPTIONS_CLUSTERS_PAYLOAD,
    value,
  }
}
const setStateChartOptionsCcr = function setStateChartOptionsCcr(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_CLUSTERS_CCR,
    value,
  }
}
const setStateChartOptionsPcr = function setStateChartOptionsPcr(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_CLUSTERS_PCR,
    value,
  }
}
const setStateChartOptionsUsers = function setStateChartOptionsUsers(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_CLUSTERS_USERS,
    value,
  }
}

const setConfigChartConsult = function setConfigChartConsult(config) {
  return {
    type: STATISTICS_SUCCESS_CLUSTERS_CONSULT,
    config,
  }
}

const setConfigChartErlang = function setConfigChartErlang(config) {
  return {
    type: STATISTICS_SUCCESS_CLUSTERS_ERLANG,
    config,
  }
}

const setConfigChartPayload = function setConfigChartPayload(config) {
  return {
    type: STATISTICS_SUCCESS_CLUSTERS_PAYLOAD,
    config,
  }
}
const setConfigChartCcr = function setConfigChartCcr(config) {
  return {
    type: STATISTICS_SUCCESS_CLUSTERS_CCR,
    config,
  }
}
const setConfigChartPcr = function setConfigChartPcr(config) {
  return {
    type: STATISTICS_SUCCESS_CLUSTERS_PCR,
    config,
  }
}
const setConfigChartUsers = function setConfigChartUsers(config) {
  return {
    type: STATISTICS_SUCCESS_CLUSTERS_USERS,
    config,
  }
}

const setPreloaderStateErlang = function setPreloaderStateErlang(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_CLUSTERS_ERLANG,
    stateFetch,
  }
}
const setPreloaderStatePayload = function setPreloaderStatePayload(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_CLUSTERS_PAYLOAD,
    stateFetch,
  }
}
const setPreloaderStateCcr = function setPreloaderStateCcr(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_CLUSTERS_CCR,
    stateFetch,
  }
}
const setPreloaderStatePcr = function setPreloaderStatePcr(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_CLUSTERS_PCR,
    stateFetch,
  }
}
const setPreloaderStateUsers = function setPreloaderStateUsers(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_CLUSTERS_USERS,
    stateFetch,
  }
}

//Breadcrumb actions
const menuSelectorLapse = function menuSelectorLapse(value) {
  return {
    type: MENU_SELECTOR_LAPSE_CLUSTERS,
    value,
  }
}

const showCluster = function showCluster(value) {
  return {
    type: SHOW_CLUSTER,
    value,
  }
}

const showSearchCluster = function showSearchCluster(value) {
  return {
    type: SEARCH_CLUSTERS,
    value,
  }
}

const clustersSuggestions = function clustersSuggestions(value) {
  return {
    type: CLUSTERS_SUGGESTIONS,
    value,
  }
}

const selectedCluster = function selectedCluster(cluster) {
  return {
    type: SELECTED_CLUSTER,
    cluster,
  }
}

const showRegion = function showRegion(value) {
  return {
    type: SHOW_REGION_CLUSTERS,
    value,
  }
}

const showSearchRegion = function showSearchRegion(value) {
  return {
    type: SEARCH_REGION_CLUSTERS,
    value,
  }
}

const regionSuggestions = function regionSuggestions(value) {
  return {
    type: REGION_SUGGESTIONS_CLUSTERS,
    value,
  }
}

const selectedRegion = function selectedRegion(region) {
  return {
    type: SELECTED_REGION_CLUSTERS,
    region,
  }
}

const modalCalendar = function modalCalendar(value) {
  return {
    type: MODAL_CALENDAR_CLUSTERS,
    value,
  }
}

const setCalendarDateStart = function setCalendarDateStart(value) {
  return {
    type: SET_CALENDAR_DATE_START_CLUSTERS,
    value,
  }
}

const setCalendarDateEnd = function setCalendarDateEnd(value) {
  return {
    type: SET_CALENDAR_DATE_END_CLUSTERS,
    value,
  }
}
const setSelectedTimeLapse = function setSelectedTimeLapse(value) {
  return {
    type: SET_SELECTED_TIME_LAPSE_CLUSTERS,
    value,
  }
}
const regionInputChange = function regionInputChange(value) {
  return {
    type: REGION_INPUT_CHANGE_CLUSTERS,
    value,
  }
}

const clusterInputChange = function clusterInputChange(value) {
  return {
    type: CLUSTERS_INPUT_CHANGE,
    value,
  }
}

const fillRegionsWithResquest = function fillRegionsWithResquest(regions) {
  return {
    type: REGION_SUCCESS_CLUSTERS,
    regions,
  }
}
const fillClustersWithResquest = function fillClustersWithResquest(clusters) {
  return {
    type: CLUSTERS_SUCCESS,
    clusters,
  }
}
const regionRequest = function regionRequest(value, groupId) {
  return {
    type: REGION_REQUESTING_CLUSTERS,
    value,
    groupId,
  }
}

const clustersRequest = function clustersRequest(IDREGION, IDGROUP) {
  return {
    type: CLUSTERS_REQUESTING,
    IDREGION,
    IDGROUP,
  }
}

const statisticsErlangRequest = function statisticsErlangRequest(value) {
  return {
    type: STATISTICS_REQUESTING_CLUSTERS_ERLANG,
    value,
  }
}
const statisticsPayloadRequest = function statisticsPayloadRequest(value) {
  return {
    type: STATISTICS_REQUESTING_CLUSTERS_PAYLOAD,
    value,
  }
}
const statisticsCcrRequest = function statisticsCcrRequest(value) {
  return {
    type: STATISTICS_REQUESTING_CLUSTERS_CCR,
    value,
  }
}
const statisticsPcrRequest = function statisticsPcrRequest(value) {
  return {
    type: STATISTICS_REQUESTING_CLUSTERS_PCR,
    value,
  }
}
const statisticsUsersRequest = function statisticsUsersRequest(value) {
  return {
    type: STATISTICS_REQUESTING_CLUSTERS_USERS,
    value,
  }
}

const statisticsRequest = function statisticsRequest(value) {
  return {
    type: STATISTICS_REQUESTING_CLUSTERS_CONSULT,
    value,
  }
}
const setChartOptionsErlang = function setChartOptionsErlang(value) {
  return {
    type: SET_CHART_OPTIONS_CLUSTERS_ERLANG,
    value,
  }
}
const setChartOptionsPayload = function setChartOptionsPayload(value) {
  return {
    type: SET_CHART_OPTIONS_CLUSTERS_PAYLOAD,
    value,
  }
}
const setChartOptionsCcr = function setChartOptionsCcr(value) {
  return {
    type: SET_CHART_OPTIONS_CLUSTERS_CCR,
    value,
  }
}
const setChartOptionsPcr = function setChartOptionsPcr(value) {
  return {
    type: SET_CHART_OPTIONS_CLUSTERS_PCR,
    value,
  }
}
const setChartOptionsUser = function setChartOptionsUser(value) {
  return {
    type: SET_CHART_OPTIONS_CLUSTERS_USERS,
    value,
  }
}

const setSelectedGroup = function setSelectedGroup(group) {
  return {
    type: SELECTED_GROUP_CLUSTERS,
    group,
  }
}

const setSetStateGroupMenu = function setSetStateGroupMenu(value) {
  return {
    type: SET_STATE_GROUP_MENU_CLUSTERS,
    value,
  }
}

const changeConsultState = function changeConsultState(value) {
  return {
    type: CHANGE_CONSULT_STATE_CLUSTERS,
    value,
  }
}

const setChartOptions = function setChartOptions(value) {
  return {
    type: SET_CHART_OPTIONS_CLUSTERS_CONSULT,
    value,
  }
}

const setStateChartOptions = function setStateChartOptions(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_CLUSTERS_CONSULT,
    value,
  }
}

const selectedService = function selectedService(value) {
  return {
    type: SELECTED_SERVICE_CLUSTERS_CONSULT,
    value,
  }
}

export {
  setStateChartOptionsErlang,
  setStateChartOptionsPayload,
  setStateChartOptionsCcr,
  setStateChartOptionsPcr,
  setStateChartOptionsUsers,
  setConfigChartConsult,
  setConfigChartErlang,
  setConfigChartPayload,
  setConfigChartCcr,
  setConfigChartPcr,
  setConfigChartUsers,
  setPreloaderStateErlang,
  setPreloaderStatePayload,
  setPreloaderStateCcr,
  setPreloaderStatePcr,
  setPreloaderStateUsers,
  menuSelectorLapse,
  showCluster,
  showSearchCluster,
  clustersSuggestions,
  selectedCluster,
  showRegion,
  showSearchRegion,
  regionSuggestions,
  selectedRegion,
  modalCalendar,
  setCalendarDateStart,
  setCalendarDateEnd,
  setSelectedTimeLapse,
  regionInputChange,
  clusterInputChange,
  fillRegionsWithResquest,
  fillClustersWithResquest,
  regionRequest,
  clustersRequest,
  statisticsErlangRequest,
  statisticsPayloadRequest,
  statisticsCcrRequest,
  statisticsPcrRequest,
  statisticsUsersRequest,
  setChartOptionsErlang,
  setChartOptionsPayload,
  setChartOptionsCcr,
  setChartOptionsPcr,
  setChartOptionsUser,
  setSelectedGroup,
  setSetStateGroupMenu,
  changeConsultState,
  setChartOptions,
  setStateChartOptions,
  selectedService,
  statisticsRequest,
}
