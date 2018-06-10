import {
  SET_STATE_CHART_OPTIONS_MARKETS_ERLANG,
  SET_STATE_CHART_OPTIONS_MARKETS_PAYLOAD,
  SET_STATE_CHART_OPTIONS_MARKETS_CCR,
  SET_STATE_CHART_OPTIONS_MARKETS_PCR,
  SET_STATE_CHART_OPTIONS_MARKETS_USERS,
  SET_PRELOADER_STATE_MARKETS_ERLANG,
  SET_PRELOADER_STATE_MARKETS_PAYLOAD,
  SET_PRELOADER_STATE_MARKETS_CCR,
  SET_PRELOADER_STATE_MARKETS_PCR,
  SET_PRELOADER_STATE_MARKETS_USERS,
  //Breadcrumb constants
  MENU_SELECTOR_LAPSE_MARKETS,
  MODAL_CALENDAR_MARKETS,
  SET_CALENDAR_DATE_START_MARKETS,
  SET_CALENDAR_DATE_END_MARKETS,
  SET_SELECTED_TIME_LAPSE_MARKETS,
  SHOW_MARKET,
  SEARCH_MARKETS,
  MARKETS_SUGGESTIONS,
  SELECTED_MARKET,
  SHOW_REGION_MARKETS,
  SEARCH_REGION_MARKETS,
  REGION_SUGGESTIONS_MARKETS,
  SELECTED_REGION_MARKETS,
  REGION_INPUT_CHANGE_MARKETS,
  MARKETS_INPUT_CHANGE,
  REGION_REQUESTING_MARKETS,
  REGION_SUCCESS_MARKETS,
  MARKETS_REQUESTING,
  MARKETS_SUCCESS,
  STATISTICS_REQUESTING_MARKETS_ERLANG,
  STATISTICS_REQUESTING_MARKETS_PAYLOAD,
  STATISTICS_REQUESTING_MARKETS_CCR,
  STATISTICS_REQUESTING_MARKETS_PCR,
  STATISTICS_REQUESTING_MARKETS_USERS,
  STATISTICS_SUCCESS_MARKETS_ERLANG,
  STATISTICS_SUCCESS_MARKETS_PAYLOAD,
  STATISTICS_SUCCESS_MARKETS_CCR,
  STATISTICS_SUCCESS_MARKETS_PCR,
  STATISTICS_SUCCESS_MARKETS_USERS,
  SET_CHART_OPTIONS_MARKETS_ERLANG,
  SET_CHART_OPTIONS_MARKETS_PAYLOAD,
  SET_CHART_OPTIONS_MARKETS_CCR,
  SET_CHART_OPTIONS_MARKETS_PCR,
  SET_CHART_OPTIONS_MARKETS_USERS,
  SELECTED_GROUP_MARKETS,
  SET_STATE_GROUP_MENU_MARKETS,
  CHANGE_CONSULT_STATE_MARKETS,
  SET_CHART_OPTIONS_MARKETS_CONSULT,
  SET_STATE_CHART_OPTIONS_MARKETS_CONSULT,
  SELECTED_SERVICE_MARKETS_CONSULT,
  STATISTICS_REQUESTING_MARKETS_CONSULT,
  STATISTICS_SUCCESS_MARKETS_CONSULT,
} from './constants.js'

const setStateChartOptionsErlang = function setStateChartOptionsErlang(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_MARKETS_ERLANG,
    value,
  }
}
const setStateChartOptionsPayload = function setStateChartOptionsPayload(
  value
) {
  return {
    type: SET_STATE_CHART_OPTIONS_MARKETS_PAYLOAD,
    value,
  }
}
const setStateChartOptionsCcr = function setStateChartOptionsCcr(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_MARKETS_CCR,
    value,
  }
}
const setStateChartOptionsPcr = function setStateChartOptionsPcr(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_MARKETS_PCR,
    value,
  }
}
const setStateChartOptionsUsers = function setStateChartOptionsUsers(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_MARKETS_USERS,
    value,
  }
}

const setConfigChartConsult = function setConfigChartConsult(config) {
  return {
    type: STATISTICS_SUCCESS_MARKETS_CONSULT,
    config,
  }
}
const setConfigChartErlang = function setConfigChartErlang(config) {
  return {
    type: STATISTICS_SUCCESS_MARKETS_ERLANG,
    config,
  }
}

const setConfigChartPayload = function setConfigChartPayload(config) {
  return {
    type: STATISTICS_SUCCESS_MARKETS_PAYLOAD,
    config,
  }
}
const setConfigChartCcr = function setConfigChartCcr(config) {
  return {
    type: STATISTICS_SUCCESS_MARKETS_CCR,
    config,
  }
}
const setConfigChartPcr = function setConfigChartPcr(config) {
  return {
    type: STATISTICS_SUCCESS_MARKETS_PCR,
    config,
  }
}
const setConfigChartUsers = function setConfigChartUsers(config) {
  return {
    type: STATISTICS_SUCCESS_MARKETS_USERS,
    config,
  }
}

const setPreloaderStateErlang = function setPreloaderStateErlang(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_MARKETS_ERLANG,
    stateFetch,
  }
}
const setPreloaderStatePayload = function setPreloaderStatePayload(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_MARKETS_PAYLOAD,
    stateFetch,
  }
}
const setPreloaderStateCcr = function setPreloaderStateCcr(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_MARKETS_CCR,
    stateFetch,
  }
}
const setPreloaderStatePcr = function setPreloaderStatePcr(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_MARKETS_PCR,
    stateFetch,
  }
}
const setPreloaderStateUsers = function setPreloaderStateUsers(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_MARKETS_USERS,
    stateFetch,
  }
}

//Breadcrumb actions
const menuSelectorLapse = function menuSelectorLapse(value) {
  return {
    type: MENU_SELECTOR_LAPSE_MARKETS,
    value,
  }
}

const showMarket = function showMarket(value) {
  return {
    type: SHOW_MARKET,
    value,
  }
}

const showSearchMarket = function showSearchMarket(value) {
  return {
    type: SEARCH_MARKETS,
    value,
  }
}

const marketsSuggestions = function marketsSuggestions(value) {
  return {
    type: MARKETS_SUGGESTIONS,
    value,
  }
}

const selectedMarket = function selectedMarket(market) {
  return {
    type: SELECTED_MARKET,
    market,
  }
}

const showRegion = function showRegion(value) {
  return {
    type: SHOW_REGION_MARKETS,
    value,
  }
}

const showSearchRegion = function showSearchRegion(value) {
  return {
    type: SEARCH_REGION_MARKETS,
    value,
  }
}

const regionSuggestions = function regionSuggestions(value) {
  return {
    type: REGION_SUGGESTIONS_MARKETS,
    value,
  }
}

const selectedRegion = function selectedRegion(region) {
  return {
    type: SELECTED_REGION_MARKETS,
    region,
  }
}

const modalCalendar = function modalCalendar(value) {
  return {
    type: MODAL_CALENDAR_MARKETS,
    value,
  }
}

const setCalendarDateStart = function setCalendarDateStart(value) {
  return {
    type: SET_CALENDAR_DATE_START_MARKETS,
    value,
  }
}

const setCalendarDateEnd = function setCalendarDateEnd(value) {
  return {
    type: SET_CALENDAR_DATE_END_MARKETS,
    value,
  }
}
const setSelectedTimeLapse = function setSelectedTimeLapse(value) {
  return {
    type: SET_SELECTED_TIME_LAPSE_MARKETS,
    value,
  }
}
const regionInputChange = function regionInputChange(value) {
  return {
    type: REGION_INPUT_CHANGE_MARKETS,
    value,
  }
}

const marketInputChange = function marketInputChange(value) {
  return {
    type: MARKETS_INPUT_CHANGE,
    value,
  }
}

const fillRegionsWithResquest = function fillRegionsWithResquest(regions) {
  return {
    type: REGION_SUCCESS_MARKETS,
    regions,
  }
}
const fillMarketsWithResquest = function fillMarketsWithResquest(markets) {
  return {
    type: MARKETS_SUCCESS,
    markets,
  }
}
const regionRequest = function regionRequest(value, groupId) {
  return {
    type: REGION_REQUESTING_MARKETS,
    value,
    groupId,
  }
}

const marketsRequest = function marketsRequest(IDREGION, IDGROUP) {
  return {
    type: MARKETS_REQUESTING,
    IDREGION,
    IDGROUP,
  }
}

const statisticsErlangRequest = function statisticsErlangRequest(value) {
  return {
    type: STATISTICS_REQUESTING_MARKETS_ERLANG,
    value,
  }
}
const statisticsPayloadRequest = function statisticsPayloadRequest(value) {
  return {
    type: STATISTICS_REQUESTING_MARKETS_PAYLOAD,
    value,
  }
}
const statisticsCcrRequest = function statisticsCcrRequest(value) {
  return {
    type: STATISTICS_REQUESTING_MARKETS_CCR,
    value,
  }
}
const statisticsPcrRequest = function statisticsPcrRequest(value) {
  return {
    type: STATISTICS_REQUESTING_MARKETS_PCR,
    value,
  }
}
const statisticsUsersRequest = function statisticsUsersRequest(value) {
  return {
    type: STATISTICS_REQUESTING_MARKETS_USERS,
    value,
  }
}

const statisticsRequest = function statisticsRequest(value) {
  return {
    type: STATISTICS_REQUESTING_MARKETS_CONSULT,
    value,
  }
}
const setChartOptionsErlang = function setChartOptionsErlang(value) {
  return {
    type: SET_CHART_OPTIONS_MARKETS_ERLANG,
    value,
  }
}
const setChartOptionsPayload = function setChartOptionsPayload(value) {
  return {
    type: SET_CHART_OPTIONS_MARKETS_PAYLOAD,
    value,
  }
}
const setChartOptionsCcr = function setChartOptionsCcr(value) {
  return {
    type: SET_CHART_OPTIONS_MARKETS_CCR,
    value,
  }
}
const setChartOptionsPcr = function setChartOptionsPcr(value) {
  return {
    type: SET_CHART_OPTIONS_MARKETS_PCR,
    value,
  }
}
const setChartOptionsUser = function setChartOptionsUser(value) {
  return {
    type: SET_CHART_OPTIONS_MARKETS_USERS,
    value,
  }
}

const setSelectedGroup = function setSelectedGroup(group) {
  return {
    type: SELECTED_GROUP_MARKETS,
    group,
  }
}

const setSetStateGroupMenu = function setSetStateGroupMenu(value) {
  return {
    type: SET_STATE_GROUP_MENU_MARKETS,
    value,
  }
}

const changeConsultState = function changeConsultState(value) {
  return {
    type: CHANGE_CONSULT_STATE_MARKETS,
    value,
  }
}

const setChartOptions = function setChartOptions(value) {
  return {
    type: SET_CHART_OPTIONS_MARKETS_CONSULT,
    value,
  }
}

const setStateChartOptions = function setStateChartOptions(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_MARKETS_CONSULT,
    value,
  }
}

const selectedService = function selectedService(value) {
  return {
    type: SELECTED_SERVICE_MARKETS_CONSULT,
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
  showMarket,
  showSearchMarket,
  marketsSuggestions,
  selectedMarket,
  showRegion,
  showSearchRegion,
  regionSuggestions,
  selectedRegion,
  modalCalendar,
  setCalendarDateStart,
  setCalendarDateEnd,
  setSelectedTimeLapse,
  regionInputChange,
  marketInputChange,
  fillRegionsWithResquest,
  fillMarketsWithResquest,
  regionRequest,
  marketsRequest,
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
