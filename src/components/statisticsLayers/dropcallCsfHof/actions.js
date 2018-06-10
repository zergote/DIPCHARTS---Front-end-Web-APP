import {
  SET_STATE_CHART_OPTIONS_DROPCALLCSFHOF,
  SET_PRELOADER_STATE_DROPCALLCSFHOF,

  //Breadcrumb constants
  MENU_SELECTOR_LAPSE_DROPCALLCSFHOF,
  MENU_SELECTOR_SERVICE_DROPCALLCSFHOF,
  SELECTED_SERVICE_DROPCALLCSFHOF,
  MODAL_CALENDAR_DROPCALLCSFHOF,
  SET_CALENDAR_DATE_START_DROPCALLCSFHOF,
  SET_CALENDAR_DATE_END_DROPCALLCSFHOF,
  SET_SELECTED_TIME_LAPSE_DROPCALLCSFHOF,
  SHOW_CLUSTER_DROPCALLCSFHOF,
  SEARCH_CLUSTER_DROPCALLCSFHOF,
  CLUSTER_SUGGESTIONS_DROPCALLCSFHOF,
  SELECTED_CLUSTER_DROPCALLCSFHOF,
  SHOW_REGION_DROPCALLCSFHOF,
  SEARCH_REGION_DROPCALLCSFHOF,
  REGION_SUGGESTIONS_DROPCALLCSFHOF,
  SELECTED_REGION_DROPCALLCSFHOF,
  REGION_INPUT_CHANGE_DROPCALLCSFHOF,
  CLUSTER_INPUT_CHANGE_DROPCALLCSFHOF,
  REGION_REQUESTING_DROPCALLCSFHOF,
  REGION_SUCCESS_DROPCALLCSFHOF,
  CLUSTER_REQUESTING_DROPCALLCSFHOF,
  CLUSTER_SUCCESS_DROPCALLCSFHOF,
  STATISTICS_REQUESTING_DROPCALLCSFHOF,
  STATISTICS_SUCCESS_DROPCALLCSFHOF,
  SET_CHART_OPTIONS_DROPCALLCSFHOF,
  SELECTED_GROUP_DROPCALLCSFHOF,
  SET_STATE_GROUP_MENU_DROPCALLCSFHOF,
} from './constants.js'

const setStateChartOptions = function setStateChartOptions(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_DROPCALLCSFHOF,
    value,
  }
}

const setConfigChart = function setConfigChart(config) {
  return {
    type: STATISTICS_SUCCESS_DROPCALLCSFHOF,
    config,
  }
}

const setPreloaderState = function setPreloaderState(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_DROPCALLCSFHOF,
    stateFetch,
  }
}

//Breadcrumb actions
const menuSelectorLapse = function menuSelectorLapse(value) {
  return {
    type: MENU_SELECTOR_LAPSE_DROPCALLCSFHOF,
    value,
  }
}

const menuSelectorService = function menuSelectorService(value) {
  return {
    type: MENU_SELECTOR_SERVICE_DROPCALLCSFHOF,
    value,
  }
}

const selectedService = function selectedService(value) {
  return {
    type: SELECTED_SERVICE_DROPCALLCSFHOF,
    value,
  }
}

const showCluster = function showCluster(value) {
  return {
    type: SHOW_CLUSTER_DROPCALLCSFHOF,
    value,
  }
}

const showSearchCluster = function showSearchCluster(value) {
  return {
    type: SEARCH_CLUSTER_DROPCALLCSFHOF,
    value,
  }
}

const clusterSuggestions = function clusterSuggestions(value) {
  return {
    type: CLUSTER_SUGGESTIONS_DROPCALLCSFHOF,
    value,
  }
}

const selectedCluster = function selectedCluster(cluster) {
  return {
    type: SELECTED_CLUSTER_DROPCALLCSFHOF,
    cluster,
  }
}

const showRegion = function showRegion(value) {
  return {
    type: SHOW_REGION_DROPCALLCSFHOF,
    value,
  }
}

const showSearchRegion = function showSearchRegion(value) {
  return {
    type: SEARCH_REGION_DROPCALLCSFHOF,
    value,
  }
}

const regionSuggestions = function regionSuggestions(value) {
  return {
    type: REGION_SUGGESTIONS_DROPCALLCSFHOF,
    value,
  }
}

const selectedRegion = function selectedRegion(region) {
  return {
    type: SELECTED_REGION_DROPCALLCSFHOF,
    region,
  }
}

const modalCalendar = function modalCalendar(value) {
  return {
    type: MODAL_CALENDAR_DROPCALLCSFHOF,
    value,
  }
}

const setCalendarDateStart = function setCalendarDateStart(value) {
  return {
    type: SET_CALENDAR_DATE_START_DROPCALLCSFHOF,
    value,
  }
}

const setCalendarDateEnd = function setCalendarDateEnd(value) {
  return {
    type: SET_CALENDAR_DATE_END_DROPCALLCSFHOF,
    value,
  }
}
const setSelectedTimeLapse = function setSelectedTimeLapse(value) {
  return {
    type: SET_SELECTED_TIME_LAPSE_DROPCALLCSFHOF,
    value,
  }
}
const regionInputChange = function regionInputChange(value) {
  return {
    type: REGION_INPUT_CHANGE_DROPCALLCSFHOF,
    value,
  }
}

const clusterInputChange = function clusterInputChange(value) {
  return {
    type: CLUSTER_INPUT_CHANGE_DROPCALLCSFHOF,
    value,
  }
}

const fillRegionsWithResquest = function fillRegionsWithResquest(regions) {
  return {
    type: REGION_SUCCESS_DROPCALLCSFHOF,
    regions,
  }
}
const fillClustersWithResquest = function fillClustersWithResquest(clusters) {
  return {
    type: CLUSTER_SUCCESS_DROPCALLCSFHOF,
    clusters,
  }
}

const regionRequest = function regionRequest(value, groupId) {
  return {
    type: REGION_REQUESTING_DROPCALLCSFHOF,
    value,
    groupId,
  }
}

const clusterRequest = function clusterRequest(value) {
  return {
    type: CLUSTER_REQUESTING_DROPCALLCSFHOF,
    value,
  }
}

const statisticsRequest = function statisticsRequest(value) {
  return {
    type: STATISTICS_REQUESTING_DROPCALLCSFHOF,
    value,
  }
}

const setChartOptions = function setChartOptions(value) {
  return {
    type: SET_CHART_OPTIONS_DROPCALLCSFHOF,
    value,
  }
}

const setSelectedGroup = function setSelectedGroup(group) {
  return {
    type: SELECTED_GROUP_DROPCALLCSFHOF,
    group,
  }
}

const setSetStateGroupMenu = function setSetStateGroupMenu(value) {
  return {
    type: SET_STATE_GROUP_MENU_DROPCALLCSFHOF,
    value,
  }
}

export {
  setStateChartOptions,
  setConfigChart,
  setPreloaderState,
  menuSelectorLapse,
  menuSelectorService,
  selectedService,
  showRegion,
  showSearchRegion,
  selectedRegion,
  regionSuggestions,
  showCluster,
  showSearchCluster,
  clusterSuggestions,
  selectedCluster,
  modalCalendar,
  setCalendarDateStart,
  setCalendarDateEnd,
  setSelectedTimeLapse,
  regionInputChange,
  clusterInputChange,
  fillRegionsWithResquest,
  fillClustersWithResquest,
  regionRequest,
  clusterRequest,
  statisticsRequest,
  setChartOptions,
  setSelectedGroup,
  setSetStateGroupMenu,
}
