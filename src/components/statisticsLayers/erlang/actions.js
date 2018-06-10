import {
  SET_STATE_CHART_OPTIONS_ERLANG,
  SET_PRELOADER_STATE_ERLANG,

  //Breadcrumb constants
  MENU_SELECTOR_LAPSE_ERLANG,
  MENU_SELECTOR_SERVICE_ERLANG,
  SELECTED_SERVICE_ERLANG,
  MODAL_CALENDAR_ERLANG,
  SET_CALENDAR_DATE_START_ERLANG,
  SET_CALENDAR_DATE_END_ERLANG,
  SET_SELECTED_TIME_LAPSE_ERLANG,
  SHOW_STATION_ERLANG,
  SEARCH_STATION_ERLANG,
  STATION_SUGGESTIONS_ERLANG,
  SELECTED_STATION_ERLANG,
  SHOW_SECTOR_ERLANG,
  SEARCH_SECTOR_ERLANG,
  SECTOR_SUGGESTIONS_ERLANG,
  SELECTED_SECTOR_ERLANG,
  SHOW_REGION_ERLANG,
  SEARCH_REGION_ERLANG,
  REGION_SUGGESTIONS_ERLANG,
  SELECTED_REGION_ERLANG,
  REGION_INPUT_CHANGE_ERLANG,
  STATION_INPUT_CHANGE_ERLANG,
  SECTOR_INPUT_CHANGE_ERLANG,
  REGION_REQUESTING_ERLANG,
  REGION_SUCCESS_ERLANG,
  STATION_REQUESTING_ERLANG,
  STATION_SUCCESS_ERLANG,
  SECTOR_REQUESTING_ERLANG,
  SECTOR_SUCCESS_ERLANG,
  STATISTICS_REQUESTING_ERLANG,
  STATISTICS_SUCCESS_ERLANG,
  SET_CHART_OPTIONS_ERLANG,
  SELECTED_GROUP_ERLANG,
  SET_STATE_GROUP_MENU_ERLANG,
} from './constants.js'

const setStateChartOptions = function setStateChartOptions(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_ERLANG,
    value,
  }
}

const setConfigChart = function setConfigChart(config) {
  return {
    type: STATISTICS_SUCCESS_ERLANG,
    config,
  }
}

const setPreloaderState = function setPreloaderState(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_ERLANG,
    stateFetch,
  }
}

//Breadcrumb actions
const menuSelectorLapse = function menuSelectorLapse(value) {
  return {
    type: MENU_SELECTOR_LAPSE_ERLANG,
    value,
  }
}

const menuSelectorService = function menuSelectorService(value) {
  return {
    type: MENU_SELECTOR_SERVICE_ERLANG,
    value,
  }
}

const selectedService = function selectedService(value) {
  return {
    type: SELECTED_SERVICE_ERLANG,
    value,
  }
}

const showStation = function showStation(value) {
  return {
    type: SHOW_STATION_ERLANG,
    value,
  }
}

const showSearchStation = function showSearchStation(value) {
  return {
    type: SEARCH_STATION_ERLANG,
    value,
  }
}

const stationSuggestions = function stationSuggestions(value) {
  return {
    type: STATION_SUGGESTIONS_ERLANG,
    value,
  }
}

const selectedStation = function selectedStation(station) {
  return {
    type: SELECTED_STATION_ERLANG,
    station,
  }
}

const showSector = function showSector(value) {
  return {
    type: SHOW_SECTOR_ERLANG,
    value,
  }
}

const showSearchSector = function showSearchSector(value) {
  return {
    type: SEARCH_SECTOR_ERLANG,
    value,
  }
}

const sectorSuggestions = function sectorSuggestions(value) {
  return {
    type: SECTOR_SUGGESTIONS_ERLANG,
    value,
  }
}

const selectedSector = function selectedSector(sector) {
  return {
    type: SELECTED_SECTOR_ERLANG,
    sector,
  }
}

const showRegion = function showRegion(value) {
  return {
    type: SHOW_REGION_ERLANG,
    value,
  }
}

const showSearchRegion = function showSearchRegion(value) {
  return {
    type: SEARCH_REGION_ERLANG,
    value,
  }
}

const regionSuggestions = function regionSuggestions(value) {
  return {
    type: REGION_SUGGESTIONS_ERLANG,
    value,
  }
}

const selectedRegion = function selectedRegion(region) {
  return {
    type: SELECTED_REGION_ERLANG,
    region,
  }
}

const modalCalendar = function modalCalendar(value) {
  return {
    type: MODAL_CALENDAR_ERLANG,
    value,
  }
}

const setCalendarDateStart = function setCalendarDateStart(value) {
  return {
    type: SET_CALENDAR_DATE_START_ERLANG,
    value,
  }
}

const setCalendarDateEnd = function setCalendarDateEnd(value) {
  return {
    type: SET_CALENDAR_DATE_END_ERLANG,
    value,
  }
}
const setSelectedTimeLapse = function setSelectedTimeLapse(value) {
  return {
    type: SET_SELECTED_TIME_LAPSE_ERLANG,
    value,
  }
}
const regionInputChange = function regionInputChange(value) {
  return {
    type: REGION_INPUT_CHANGE_ERLANG,
    value,
  }
}

const stationInputChange = function stationInputChange(value) {
  return {
    type: STATION_INPUT_CHANGE_ERLANG,
    value,
  }
}
const sectorInputChange = function sectorInputChange(value) {
  return {
    type: SECTOR_INPUT_CHANGE_ERLANG,
    value,
  }
}
const fillRegionsWithResquest = function fillRegionsWithResquest(regions) {
  return {
    type: REGION_SUCCESS_ERLANG,
    regions,
  }
}
const fillStationsWithResquest = function fillStationsWithResquest(stations) {
  return {
    type: STATION_SUCCESS_ERLANG,
    stations,
  }
}
const fillSectorsWithResquest = function fillSectorsWithResquest(sectors) {
  return {
    type: SECTOR_SUCCESS_ERLANG,
    sectors,
  }
}

const regionRequest = function regionRequest(value, groupId) {
  return {
    type: REGION_REQUESTING_ERLANG,
    value,
    groupId,
  }
}

const stationRequest = function stationRequest(value) {
  return {
    type: STATION_REQUESTING_ERLANG,
    value,
  }
}

const sectorRequest = function sectorRequest(value) {
  return {
    type: SECTOR_REQUESTING_ERLANG,
    value,
  }
}

const statisticsRequest = function statisticsRequest(value) {
  return {
    type: STATISTICS_REQUESTING_ERLANG,
    value,
  }
}

const setChartOptions = function setChartOptions(value) {
  return {
    type: SET_CHART_OPTIONS_ERLANG,
    value,
  }
}

const setSelectedGroup = function setSelectedGroup(group) {
  return {
    type: SELECTED_GROUP_ERLANG,
    group,
  }
}

const setSetStateGroupMenu = function setSetStateGroupMenu(value) {
  return {
    type: SET_STATE_GROUP_MENU_ERLANG,
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
