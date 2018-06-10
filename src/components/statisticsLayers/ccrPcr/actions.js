import {
  SET_STATE_CHART_OPTIONS_CCRPCR,
  SET_PRELOADER_STATE_CCRPCR,

  //Breadcrumb constants
  MENU_SELECTOR_LAPSE_CCRPCR,
  MENU_SELECTOR_SERVICE_CCRPCR,
  SELECTED_SERVICE_CCRPCR,
  MODAL_CALENDAR_CCRPCR,
  SET_CALENDAR_DATE_START_CCRPCR,
  SET_CALENDAR_DATE_END_CCRPCR,
  SET_SELECTED_TIME_LAPSE_CCRPCR,
  SHOW_STATION_CCRPCR,
  SEARCH_STATION_CCRPCR,
  STATION_SUGGESTIONS_CCRPCR,
  SELECTED_STATION_CCRPCR,
  SHOW_SECTOR_CCRPCR,
  SEARCH_SECTOR_CCRPCR,
  SECTOR_SUGGESTIONS_CCRPCR,
  SELECTED_SECTOR_CCRPCR,
  SHOW_REGION_CCRPCR,
  SEARCH_REGION_CCRPCR,
  REGION_SUGGESTIONS_CCRPCR,
  SELECTED_REGION_CCRPCR,
  REGION_INPUT_CHANGE_CCRPCR,
  STATION_INPUT_CHANGE_CCRPCR,
  SECTOR_INPUT_CHANGE_CCRPCR,
  REGION_REQUESTING_CCRPCR,
  REGION_SUCCESS_CCRPCR,
  STATION_REQUESTING_CCRPCR,
  STATION_SUCCESS_CCRPCR,
  SECTOR_REQUESTING_CCRPCR,
  SECTOR_SUCCESS_CCRPCR,
  STATISTICS_REQUESTING_CCRPCR,
  STATISTICS_SUCCESS_CCRPCR,
  SET_CHART_OPTIONS_CCRPCR,
  SELECTED_GROUP_CCRPCR,
  SET_STATE_GROUP_MENU_CCRPCR,
} from './constants.js'

const setStateChartOptions = function setStateChartOptions(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_CCRPCR,
    value,
  }
}

const setConfigChart = function setConfigChart(config) {
  return {
    type: STATISTICS_SUCCESS_CCRPCR,
    config,
  }
}

const setPreloaderState = function setPreloaderState(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_CCRPCR,
    stateFetch,
  }
}

//Breadcrumb actions
const menuSelectorLapse = function menuSelectorLapse(value) {
  return {
    type: MENU_SELECTOR_LAPSE_CCRPCR,
    value,
  }
}

const menuSelectorService = function menuSelectorService(value) {
  return {
    type: MENU_SELECTOR_SERVICE_CCRPCR,
    value,
  }
}

const selectedService = function selectedService(value) {
  return {
    type: SELECTED_SERVICE_CCRPCR,
    value,
  }
}

const showStation = function showStation(value) {
  return {
    type: SHOW_STATION_CCRPCR,
    value,
  }
}

const showSearchStation = function showSearchStation(value) {
  return {
    type: SEARCH_STATION_CCRPCR,
    value,
  }
}

const stationSuggestions = function stationSuggestions(value) {
  return {
    type: STATION_SUGGESTIONS_CCRPCR,
    value,
  }
}

const selectedStation = function selectedStation(station) {
  return {
    type: SELECTED_STATION_CCRPCR,
    station,
  }
}

const showSector = function showSector(value) {
  return {
    type: SHOW_SECTOR_CCRPCR,
    value,
  }
}

const showSearchSector = function showSearchSector(value) {
  return {
    type: SEARCH_SECTOR_CCRPCR,
    value,
  }
}

const sectorSuggestions = function sectorSuggestions(value) {
  return {
    type: SECTOR_SUGGESTIONS_CCRPCR,
    value,
  }
}

const selectedSector = function selectedSector(sector) {
  return {
    type: SELECTED_SECTOR_CCRPCR,
    sector,
  }
}

const showRegion = function showRegion(value) {
  return {
    type: SHOW_REGION_CCRPCR,
    value,
  }
}

const showSearchRegion = function showSearchRegion(value) {
  return {
    type: SEARCH_REGION_CCRPCR,
    value,
  }
}

const regionSuggestions = function regionSuggestions(value) {
  return {
    type: REGION_SUGGESTIONS_CCRPCR,
    value,
  }
}

const selectedRegion = function selectedRegion(region) {
  return {
    type: SELECTED_REGION_CCRPCR,
    region,
  }
}

const modalCalendar = function modalCalendar(value) {
  return {
    type: MODAL_CALENDAR_CCRPCR,
    value,
  }
}

const setCalendarDateStart = function setCalendarDateStart(value) {
  return {
    type: SET_CALENDAR_DATE_START_CCRPCR,
    value,
  }
}

const setCalendarDateEnd = function setCalendarDateEnd(value) {
  return {
    type: SET_CALENDAR_DATE_END_CCRPCR,
    value,
  }
}
const setSelectedTimeLapse = function setSelectedTimeLapse(value) {
  return {
    type: SET_SELECTED_TIME_LAPSE_CCRPCR,
    value,
  }
}
const regionInputChange = function regionInputChange(value) {
  return {
    type: REGION_INPUT_CHANGE_CCRPCR,
    value,
  }
}

const stationInputChange = function stationInputChange(value) {
  return {
    type: STATION_INPUT_CHANGE_CCRPCR,
    value,
  }
}
const sectorInputChange = function sectorInputChange(value) {
  return {
    type: SECTOR_INPUT_CHANGE_CCRPCR,
    value,
  }
}
const fillRegionsWithResquest = function fillRegionsWithResquest(regions) {
  return {
    type: REGION_SUCCESS_CCRPCR,
    regions,
  }
}
const fillStationsWithResquest = function fillStationsWithResquest(stations) {
  return {
    type: STATION_SUCCESS_CCRPCR,
    stations,
  }
}
const fillSectorsWithResquest = function fillSectorsWithResquest(sectors) {
  return {
    type: SECTOR_SUCCESS_CCRPCR,
    sectors,
  }
}

const regionRequest = function regionRequest(value, groupId) {
  return {
    type: REGION_REQUESTING_CCRPCR,
    value,
    groupId,
  }
}

const stationRequest = function stationRequest(value) {
  return {
    type: STATION_REQUESTING_CCRPCR,
    value,
  }
}

const sectorRequest = function sectorRequest(value) {
  return {
    type: SECTOR_REQUESTING_CCRPCR,
    value,
  }
}

const statisticsRequest = function statisticsRequest(value) {
  return {
    type: STATISTICS_REQUESTING_CCRPCR,
    value,
  }
}

const setChartOptions = function setChartOptions(value) {
  return {
    type: SET_CHART_OPTIONS_CCRPCR,
    value,
  }
}

const setSelectedGroup = function setSelectedGroup(group) {
  return {
    type: SELECTED_GROUP_CCRPCR,
    group,
  }
}

const setSetStateGroupMenu = function setSetStateGroupMenu(value) {
  return {
    type: SET_STATE_GROUP_MENU_CCRPCR,
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
