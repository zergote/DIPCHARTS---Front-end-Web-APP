import {
  SET_STATE_CHART_OPTIONS_USERS,
  SET_PRELOADER_STATE_USERS,

  //Breadcrumb constants
  MENU_SELECTOR_LAPSE_USERS,
  MENU_SELECTOR_SERVICE_USERS,
  SELECTED_SERVICE_USERS,
  MODAL_CALENDAR_USERS,
  SET_CALENDAR_DATE_START_USERS,
  SET_CALENDAR_DATE_END_USERS,
  SET_SELECTED_TIME_LAPSE_USERS,
  SHOW_STATION_USERS,
  SEARCH_STATION_USERS,
  STATION_SUGGESTIONS_USERS,
  SELECTED_STATION_USERS,
  SHOW_SECTOR_USERS,
  SEARCH_SECTOR_USERS,
  SECTOR_SUGGESTIONS_USERS,
  SELECTED_SECTOR_USERS,
  SHOW_REGION_USERS,
  SEARCH_REGION_USERS,
  REGION_SUGGESTIONS_USERS,
  SELECTED_REGION_USERS,
  REGION_INPUT_CHANGE_USERS,
  STATION_INPUT_CHANGE_USERS,
  SECTOR_INPUT_CHANGE_USERS,
  REGION_REQUESTING_USERS,
  REGION_SUCCESS_USERS,
  STATION_REQUESTING_USERS,
  STATION_SUCCESS_USERS,
  SECTOR_REQUESTING_USERS,
  SECTOR_SUCCESS_USERS,
  STATISTICS_REQUESTING_USERS,
  STATISTICS_SUCCESS_USERS,
  SET_CHART_OPTIONS_USERS,
  SELECTED_GROUP_USERS,
  SET_STATE_GROUP_MENU_USERS,
} from './constants.js'

const setStateChartOptions = function setStateChartOptions(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_USERS,
    value,
  }
}

const setConfigChart = function setConfigChart(config) {
  return {
    type: STATISTICS_SUCCESS_USERS,
    config,
  }
}

const setPreloaderState = function setPreloaderState(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_USERS,
    stateFetch,
  }
}

//Breadcrumb actions
const menuSelectorLapse = function menuSelectorLapse(value) {
  return {
    type: MENU_SELECTOR_LAPSE_USERS,
    value,
  }
}

const menuSelectorService = function menuSelectorService(value) {
  return {
    type: MENU_SELECTOR_SERVICE_USERS,
    value,
  }
}

const selectedService = function selectedService(value) {
  return {
    type: SELECTED_SERVICE_USERS,
    value,
  }
}

const showStation = function showStation(value) {
  return {
    type: SHOW_STATION_USERS,
    value,
  }
}

const showSearchStation = function showSearchStation(value) {
  return {
    type: SEARCH_STATION_USERS,
    value,
  }
}

const stationSuggestions = function stationSuggestions(value) {
  return {
    type: STATION_SUGGESTIONS_USERS,
    value,
  }
}

const selectedStation = function selectedStation(station) {
  return {
    type: SELECTED_STATION_USERS,
    station,
  }
}

const showSector = function showSector(value) {
  return {
    type: SHOW_SECTOR_USERS,
    value,
  }
}

const showSearchSector = function showSearchSector(value) {
  return {
    type: SEARCH_SECTOR_USERS,
    value,
  }
}

const sectorSuggestions = function sectorSuggestions(value) {
  return {
    type: SECTOR_SUGGESTIONS_USERS,
    value,
  }
}

const selectedSector = function selectedSector(sector) {
  return {
    type: SELECTED_SECTOR_USERS,
    sector,
  }
}

const showRegion = function showRegion(value) {
  return {
    type: SHOW_REGION_USERS,
    value,
  }
}

const showSearchRegion = function showSearchRegion(value) {
  return {
    type: SEARCH_REGION_USERS,
    value,
  }
}

const regionSuggestions = function regionSuggestions(value) {
  return {
    type: REGION_SUGGESTIONS_USERS,
    value,
  }
}

const selectedRegion = function selectedRegion(region) {
  return {
    type: SELECTED_REGION_USERS,
    region,
  }
}

const modalCalendar = function modalCalendar(value) {
  return {
    type: MODAL_CALENDAR_USERS,
    value,
  }
}

const setCalendarDateStart = function setCalendarDateStart(value) {
  return {
    type: SET_CALENDAR_DATE_START_USERS,
    value,
  }
}

const setCalendarDateEnd = function setCalendarDateEnd(value) {
  return {
    type: SET_CALENDAR_DATE_END_USERS,
    value,
  }
}
const setSelectedTimeLapse = function setSelectedTimeLapse(value) {
  return {
    type: SET_SELECTED_TIME_LAPSE_USERS,
    value,
  }
}
const regionInputChange = function regionInputChange(value) {
  return {
    type: REGION_INPUT_CHANGE_USERS,
    value,
  }
}

const stationInputChange = function stationInputChange(value) {
  return {
    type: STATION_INPUT_CHANGE_USERS,
    value,
  }
}
const sectorInputChange = function sectorInputChange(value) {
  return {
    type: SECTOR_INPUT_CHANGE_USERS,
    value,
  }
}
const fillRegionsWithResquest = function fillRegionsWithResquest(regions) {
  return {
    type: REGION_SUCCESS_USERS,
    regions,
  }
}
const fillStationsWithResquest = function fillStationsWithResquest(stations) {
  return {
    type: STATION_SUCCESS_USERS,
    stations,
  }
}
const fillSectorsWithResquest = function fillSectorsWithResquest(sectors) {
  return {
    type: SECTOR_SUCCESS_USERS,
    sectors,
  }
}

const regionRequest = function regionRequest(value, groupId) {
  return {
    type: REGION_REQUESTING_USERS,
    value,
    groupId,
  }
}

const stationRequest = function stationRequest(value) {
  return {
    type: STATION_REQUESTING_USERS,
    value,
  }
}

const sectorRequest = function sectorRequest(value) {
  return {
    type: SECTOR_REQUESTING_USERS,
    value,
  }
}

const statisticsRequest = function statisticsRequest(value) {
  return {
    type: STATISTICS_REQUESTING_USERS,
    value,
  }
}

const setChartOptions = function setChartOptions(value) {
  return {
    type: SET_CHART_OPTIONS_USERS,
    value,
  }
}

const setSelectedGroup = function setSelectedGroup(group) {
  return {
    type: SELECTED_GROUP_USERS,
    group,
  }
}

const setSetStateGroupMenu = function setSetStateGroupMenu(value) {
  return {
    type: SET_STATE_GROUP_MENU_USERS,
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
  showStation,
  showSearchStation,
  stationSuggestions,
  selectedStation,
  showSector,
  showSearchSector,
  sectorSuggestions,
  selectedSector,
  modalCalendar,
  setCalendarDateStart,
  setCalendarDateEnd,
  setSelectedTimeLapse,
  regionInputChange,
  stationInputChange,
  sectorInputChange,
  fillRegionsWithResquest,
  fillStationsWithResquest,
  fillSectorsWithResquest,
  regionRequest,
  stationRequest,
  sectorRequest,
  statisticsRequest,
  setChartOptions,
  setSelectedGroup,
  setSetStateGroupMenu,
}
