import {
  SET_STATE_CHART_OPTIONS_THROUGHPUT,
  SET_PRELOADER_STATE_THROUGHPUT,

  //Breadcrumb constants
  MENU_SELECTOR_LAPSE_THROUGHPUT,
  MENU_SELECTOR_SERVICE_THROUGHPUT,
  SELECTED_SERVICE_THROUGHPUT,
  MODAL_CALENDAR_THROUGHPUT,
  SET_CALENDAR_DATE_START_THROUGHPUT,
  SET_CALENDAR_DATE_END_THROUGHPUT,
  SET_SELECTED_TIME_LAPSE_THROUGHPUT,
  SHOW_STATION_THROUGHPUT,
  SEARCH_STATION_THROUGHPUT,
  STATION_SUGGESTIONS_THROUGHPUT,
  SELECTED_STATION_THROUGHPUT,
  SHOW_SECTOR_THROUGHPUT,
  SEARCH_SECTOR_THROUGHPUT,
  SECTOR_SUGGESTIONS_THROUGHPUT,
  SELECTED_SECTOR_THROUGHPUT,
  SHOW_REGION_THROUGHPUT,
  SEARCH_REGION_THROUGHPUT,
  REGION_SUGGESTIONS_THROUGHPUT,
  SELECTED_REGION_THROUGHPUT,
  REGION_INPUT_CHANGE_THROUGHPUT,
  STATION_INPUT_CHANGE_THROUGHPUT,
  SECTOR_INPUT_CHANGE_THROUGHPUT,
  REGION_REQUESTING_THROUGHPUT,
  REGION_SUCCESS_THROUGHPUT,
  STATION_REQUESTING_THROUGHPUT,
  STATION_SUCCESS_THROUGHPUT,
  SECTOR_REQUESTING_THROUGHPUT,
  SECTOR_SUCCESS_THROUGHPUT,
  STATISTICS_REQUESTING_THROUGHPUT,
  STATISTICS_SUCCESS_THROUGHPUT,
  SET_CHART_OPTIONS_THROUGHPUT,
  SELECTED_GROUP_THROUGHPUT,
  SET_STATE_GROUP_MENU_THROUGHPUT,
} from './constants.js'

const setStateChartOptions = function setStateChartOptions(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_THROUGHPUT,
    value,
  }
}

const setConfigChart = function setConfigChart(config) {
  return {
    type: STATISTICS_SUCCESS_THROUGHPUT,
    config,
  }
}

const setPreloaderState = function setPreloaderState(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_THROUGHPUT,
    stateFetch,
  }
}

//Breadcrumb actions
const menuSelectorLapse = function menuSelectorLapse(value) {
  return {
    type: MENU_SELECTOR_LAPSE_THROUGHPUT,
    value,
  }
}

const menuSelectorService = function menuSelectorService(value) {
  return {
    type: MENU_SELECTOR_SERVICE_THROUGHPUT,
    value,
  }
}

const selectedService = function selectedService(value) {
  return {
    type: SELECTED_SERVICE_THROUGHPUT,
    value,
  }
}

const showStation = function showStation(value) {
  return {
    type: SHOW_STATION_THROUGHPUT,
    value,
  }
}

const showSearchStation = function showSearchStation(value) {
  return {
    type: SEARCH_STATION_THROUGHPUT,
    value,
  }
}

const stationSuggestions = function stationSuggestions(value) {
  return {
    type: STATION_SUGGESTIONS_THROUGHPUT,
    value,
  }
}

const selectedStation = function selectedStation(station) {
  return {
    type: SELECTED_STATION_THROUGHPUT,
    station,
  }
}

const showSector = function showSector(value) {
  return {
    type: SHOW_SECTOR_THROUGHPUT,
    value,
  }
}

const showSearchSector = function showSearchSector(value) {
  return {
    type: SEARCH_SECTOR_THROUGHPUT,
    value,
  }
}

const sectorSuggestions = function sectorSuggestions(value) {
  return {
    type: SECTOR_SUGGESTIONS_THROUGHPUT,
    value,
  }
}

const selectedSector = function selectedSector(sector) {
  return {
    type: SELECTED_SECTOR_THROUGHPUT,
    sector,
  }
}

const showRegion = function showRegion(value) {
  return {
    type: SHOW_REGION_THROUGHPUT,
    value,
  }
}

const showSearchRegion = function showSearchRegion(value) {
  return {
    type: SEARCH_REGION_THROUGHPUT,
    value,
  }
}

const regionSuggestions = function regionSuggestions(value) {
  return {
    type: REGION_SUGGESTIONS_THROUGHPUT,
    value,
  }
}

const selectedRegion = function selectedRegion(region) {
  return {
    type: SELECTED_REGION_THROUGHPUT,
    region,
  }
}

const modalCalendar = function modalCalendar(value) {
  return {
    type: MODAL_CALENDAR_THROUGHPUT,
    value,
  }
}

const setCalendarDateStart = function setCalendarDateStart(value) {
  return {
    type: SET_CALENDAR_DATE_START_THROUGHPUT,
    value,
  }
}

const setCalendarDateEnd = function setCalendarDateEnd(value) {
  return {
    type: SET_CALENDAR_DATE_END_THROUGHPUT,
    value,
  }
}
const setSelectedTimeLapse = function setSelectedTimeLapse(value) {
  return {
    type: SET_SELECTED_TIME_LAPSE_THROUGHPUT,
    value,
  }
}
const regionInputChange = function regionInputChange(value) {
  return {
    type: REGION_INPUT_CHANGE_THROUGHPUT,
    value,
  }
}

const stationInputChange = function stationInputChange(value) {
  return {
    type: STATION_INPUT_CHANGE_THROUGHPUT,
    value,
  }
}
const sectorInputChange = function sectorInputChange(value) {
  return {
    type: SECTOR_INPUT_CHANGE_THROUGHPUT,
    value,
  }
}
const fillRegionsWithResquest = function fillRegionsWithResquest(regions) {
  return {
    type: REGION_SUCCESS_THROUGHPUT,
    regions,
  }
}
const fillStationsWithResquest = function fillStationsWithResquest(stations) {
  return {
    type: STATION_SUCCESS_THROUGHPUT,
    stations,
  }
}
const fillSectorsWithResquest = function fillSectorsWithResquest(sectors) {
  return {
    type: SECTOR_SUCCESS_THROUGHPUT,
    sectors,
  }
}

const regionRequest = function regionRequest(value, groupId) {
  return {
    type: REGION_REQUESTING_THROUGHPUT,
    value,
    groupId,
  }
}

const stationRequest = function stationRequest(value) {
  return {
    type: STATION_REQUESTING_THROUGHPUT,
    value,
  }
}

const sectorRequest = function sectorRequest(value) {
  return {
    type: SECTOR_REQUESTING_THROUGHPUT,
    value,
  }
}

const statisticsRequest = function statisticsRequest(value) {
  return {
    type: STATISTICS_REQUESTING_THROUGHPUT,
    value,
  }
}

const setChartOptions = function setChartOptions(value) {
  return {
    type: SET_CHART_OPTIONS_THROUGHPUT,
    value,
  }
}

const setSelectedGroup = function setSelectedGroup(group) {
  return {
    type: SELECTED_GROUP_THROUGHPUT,
    group,
  }
}

const setSetStateGroupMenu = function setSetStateGroupMenu(value) {
  return {
    type: SET_STATE_GROUP_MENU_THROUGHPUT,
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
