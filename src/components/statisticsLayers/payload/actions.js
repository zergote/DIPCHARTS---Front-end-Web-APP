import {
  SET_STATE_CHART_OPTIONS_PAYLOAD,
  SET_PRELOADER_STATE_PAYLOAD,

  //Breadcrumb constants
  MENU_SELECTOR_LAPSE_PAYLOAD,
  MENU_SELECTOR_SERVICE_PAYLOAD,
  SELECTED_SERVICE_PAYLOAD,
  MODAL_CALENDAR_PAYLOAD,
  SET_CALENDAR_DATE_START_PAYLOAD,
  SET_CALENDAR_DATE_END_PAYLOAD,
  SET_SELECTED_TIME_LAPSE_PAYLOAD,
  SHOW_STATION_PAYLOAD,
  SEARCH_STATION_PAYLOAD,
  STATION_SUGGESTIONS_PAYLOAD,
  SELECTED_STATION_PAYLOAD,
  SHOW_SECTOR_PAYLOAD,
  SEARCH_SECTOR_PAYLOAD,
  SECTOR_SUGGESTIONS_PAYLOAD,
  SELECTED_SECTOR_PAYLOAD,
  SHOW_REGION_PAYLOAD,
  SEARCH_REGION_PAYLOAD,
  REGION_SUGGESTIONS_PAYLOAD,
  SELECTED_REGION_PAYLOAD,
  REGION_INPUT_CHANGE_PAYLOAD,
  STATION_INPUT_CHANGE_PAYLOAD,
  SECTOR_INPUT_CHANGE_PAYLOAD,
  REGION_REQUESTING_PAYLOAD,
  REGION_SUCCESS_PAYLOAD,
  STATION_REQUESTING_PAYLOAD,
  STATION_SUCCESS_PAYLOAD,
  SECTOR_REQUESTING_PAYLOAD,
  SECTOR_SUCCESS_PAYLOAD,
  STATISTICS_REQUESTING_PAYLOAD,
  STATISTICS_SUCCESS_PAYLOAD,
  SET_CHART_OPTIONS_PAYLOAD,
  SELECTED_GROUP_PAYLOAD,
  SET_STATE_GROUP_MENU_PAYLOAD,
} from './constants.js'

const setStateChartOptions = function setStateChartOptions(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_PAYLOAD,
    value,
  }
}

const setConfigChart = function setConfigChart(config) {
  return {
    type: STATISTICS_SUCCESS_PAYLOAD,
    config,
  }
}

const setPreloaderState = function setPreloaderState(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_PAYLOAD,
    stateFetch,
  }
}

//Breadcrumb actions
const menuSelectorLapse = function menuSelectorLapse(value) {
  return {
    type: MENU_SELECTOR_LAPSE_PAYLOAD,
    value,
  }
}

const menuSelectorService = function menuSelectorService(value) {
  return {
    type: MENU_SELECTOR_SERVICE_PAYLOAD,
    value,
  }
}

const selectedService = function selectedService(value) {
  return {
    type: SELECTED_SERVICE_PAYLOAD,
    value,
  }
}

const showStation = function showStation(value) {
  return {
    type: SHOW_STATION_PAYLOAD,
    value,
  }
}

const showSearchStation = function showSearchStation(value) {
  return {
    type: SEARCH_STATION_PAYLOAD,
    value,
  }
}

const stationSuggestions = function stationSuggestions(value) {
  return {
    type: STATION_SUGGESTIONS_PAYLOAD,
    value,
  }
}

const selectedStation = function selectedStation(station) {
  return {
    type: SELECTED_STATION_PAYLOAD,
    station,
  }
}

const showSector = function showSector(value) {
  return {
    type: SHOW_SECTOR_PAYLOAD,
    value,
  }
}

const showSearchSector = function showSearchSector(value) {
  return {
    type: SEARCH_SECTOR_PAYLOAD,
    value,
  }
}

const sectorSuggestions = function sectorSuggestions(value) {
  return {
    type: SECTOR_SUGGESTIONS_PAYLOAD,
    value,
  }
}

const selectedSector = function selectedSector(sector) {
  return {
    type: SELECTED_SECTOR_PAYLOAD,
    sector,
  }
}

const showRegion = function showRegion(value) {
  return {
    type: SHOW_REGION_PAYLOAD,
    value,
  }
}

const showSearchRegion = function showSearchRegion(value) {
  return {
    type: SEARCH_REGION_PAYLOAD,
    value,
  }
}

const regionSuggestions = function regionSuggestions(value) {
  return {
    type: REGION_SUGGESTIONS_PAYLOAD,
    value,
  }
}

const selectedRegion = function selectedRegion(region) {
  return {
    type: SELECTED_REGION_PAYLOAD,
    region,
  }
}

const modalCalendar = function modalCalendar(value) {
  return {
    type: MODAL_CALENDAR_PAYLOAD,
    value,
  }
}

const setCalendarDateStart = function setCalendarDateStart(value) {
  return {
    type: SET_CALENDAR_DATE_START_PAYLOAD,
    value,
  }
}

const setCalendarDateEnd = function setCalendarDateEnd(value) {
  return {
    type: SET_CALENDAR_DATE_END_PAYLOAD,
    value,
  }
}
const setSelectedTimeLapse = function setSelectedTimeLapse(value) {
  return {
    type: SET_SELECTED_TIME_LAPSE_PAYLOAD,
    value,
  }
}
const regionInputChange = function regionInputChange(value) {
  return {
    type: REGION_INPUT_CHANGE_PAYLOAD,
    value,
  }
}

const stationInputChange = function stationInputChange(value) {
  return {
    type: STATION_INPUT_CHANGE_PAYLOAD,
    value,
  }
}
const sectorInputChange = function sectorInputChange(value) {
  return {
    type: SECTOR_INPUT_CHANGE_PAYLOAD,
    value,
  }
}
const fillRegionsWithResquest = function fillRegionsWithResquest(regions) {
  return {
    type: REGION_SUCCESS_PAYLOAD,
    regions,
  }
}
const fillStationsWithResquest = function fillStationsWithResquest(stations) {
  return {
    type: STATION_SUCCESS_PAYLOAD,
    stations,
  }
}
const fillSectorsWithResquest = function fillSectorsWithResquest(sectors) {
  return {
    type: SECTOR_SUCCESS_PAYLOAD,
    sectors,
  }
}

const regionRequest = function regionRequest(value, groupId) {
  return {
    type: REGION_REQUESTING_PAYLOAD,
    value,
    groupId,
  }
}

const stationRequest = function stationRequest(value) {
  return {
    type: STATION_REQUESTING_PAYLOAD,
    value,
  }
}

const sectorRequest = function sectorRequest(value) {
  return {
    type: SECTOR_REQUESTING_PAYLOAD,
    value,
  }
}

const statisticsRequest = function statisticsRequest(value) {
  return {
    type: STATISTICS_REQUESTING_PAYLOAD,
    value,
  }
}

const setChartOptions = function setChartOptions(value) {
  return {
    type: SET_CHART_OPTIONS_PAYLOAD,
    value,
  }
}

const setSelectedGroup = function setSelectedGroup(group) {
  return {
    type: SELECTED_GROUP_PAYLOAD,
    group,
  }
}

const setSetStateGroupMenu = function setSetStateGroupMenu(value) {
  return {
    type: SET_STATE_GROUP_MENU_PAYLOAD,
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
