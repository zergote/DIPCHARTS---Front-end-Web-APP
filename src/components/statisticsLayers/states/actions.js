import {
  SET_STATE_CHART_OPTIONS_STATES_ERLANG,
  SET_STATE_CHART_OPTIONS_STATES_PAYLOAD,
  SET_STATE_CHART_OPTIONS_STATES_CCR,
  SET_STATE_CHART_OPTIONS_STATES_PCR,
  SET_STATE_CHART_OPTIONS_STATES_USERS,
  SET_PRELOADER_STATE_STATES_ERLANG,
  SET_PRELOADER_STATE_STATES_PAYLOAD,
  SET_PRELOADER_STATE_STATES_CCR,
  SET_PRELOADER_STATE_STATES_PCR,
  SET_PRELOADER_STATE_STATES_USERS,
  //Breadcrumb constants
  MENU_SELECTOR_LAPSE_STATES,
  MODAL_CALENDAR_STATES,
  SET_CALENDAR_DATE_START_STATES,
  SET_CALENDAR_DATE_END_STATES,
  SET_SELECTED_TIME_LAPSE_STATES,
  SHOW_STATE,
  SEARCH_STATES,
  STATES_SUGGESTIONS,
  SELECTED_STATE,
  SHOW_REGION_STATES,
  SEARCH_REGION_STATES,
  REGION_SUGGESTIONS_STATES,
  SELECTED_REGION_STATES,
  REGION_INPUT_CHANGE_STATES,
  STATES_INPUT_CHANGE,
  REGION_REQUESTING_STATES,
  REGION_SUCCESS_STATES,
  STATES_REQUESTING,
  STATES_SUCCESS,
  STATISTICS_REQUESTING_STATES_ERLANG,
  STATISTICS_REQUESTING_STATES_PAYLOAD,
  STATISTICS_REQUESTING_STATES_CCR,
  STATISTICS_REQUESTING_STATES_PCR,
  STATISTICS_REQUESTING_STATES_USERS,
  STATISTICS_SUCCESS_STATES_ERLANG,
  STATISTICS_SUCCESS_STATES_PAYLOAD,
  STATISTICS_SUCCESS_STATES_CCR,
  STATISTICS_SUCCESS_STATES_PCR,
  STATISTICS_SUCCESS_STATES_USERS,
  SET_CHART_OPTIONS_STATES_ERLANG,
  SET_CHART_OPTIONS_STATES_PAYLOAD,
  SET_CHART_OPTIONS_STATES_CCR,
  SET_CHART_OPTIONS_STATES_PCR,
  SET_CHART_OPTIONS_STATES_USERS,
  SELECTED_GROUP_STATES,
  SET_STATE_GROUP_MENU_STATES,
  CHANGE_CONSULT_STATE_STATES,
  SET_CHART_OPTIONS_STATES_CONSULT,
  SET_STATE_CHART_OPTIONS_STATES_CONSULT,
  SELECTED_SERVICE_STATES_CONSULT,
  STATISTICS_REQUESTING_STATES_CONSULT,
  STATISTICS_SUCCESS_STATES_CONSULT,
} from './constants.js'

const setStateChartOptionsErlang = function setStateChartOptionsErlang(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_STATES_ERLANG,
    value,
  }
}
const setStateChartOptionsPayload = function setStateChartOptionsPayload(
  value
) {
  return {
    type: SET_STATE_CHART_OPTIONS_STATES_PAYLOAD,
    value,
  }
}
const setStateChartOptionsCcr = function setStateChartOptionsCcr(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_STATES_CCR,
    value,
  }
}
const setStateChartOptionsPcr = function setStateChartOptionsPcr(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_STATES_PCR,
    value,
  }
}
const setStateChartOptionsUsers = function setStateChartOptionsUsers(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_STATES_USERS,
    value,
  }
}

const setConfigChartConsult = function setConfigChartConsult(config) {
  return {
    type: STATISTICS_SUCCESS_STATES_CONSULT,
    config,
  }
}

const setConfigChartErlang = function setConfigChartErlang(config) {
  return {
    type: STATISTICS_SUCCESS_STATES_ERLANG,
    config,
  }
}

const setConfigChartPayload = function setConfigChartPayload(config) {
  return {
    type: STATISTICS_SUCCESS_STATES_PAYLOAD,
    config,
  }
}
const setConfigChartCcr = function setConfigChartCcr(config) {
  return {
    type: STATISTICS_SUCCESS_STATES_CCR,
    config,
  }
}
const setConfigChartPcr = function setConfigChartPcr(config) {
  return {
    type: STATISTICS_SUCCESS_STATES_PCR,
    config,
  }
}
const setConfigChartUsers = function setConfigChartUsers(config) {
  return {
    type: STATISTICS_SUCCESS_STATES_USERS,
    config,
  }
}

const setPreloaderStateErlang = function setPreloaderStateErlang(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_STATES_ERLANG,
    stateFetch,
  }
}
const setPreloaderStatePayload = function setPreloaderStatePayload(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_STATES_PAYLOAD,
    stateFetch,
  }
}
const setPreloaderStateCcr = function setPreloaderStateCcr(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_STATES_CCR,
    stateFetch,
  }
}
const setPreloaderStatePcr = function setPreloaderStatePcr(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_STATES_PCR,
    stateFetch,
  }
}
const setPreloaderStateUsers = function setPreloaderStateUsers(stateFetch) {
  return {
    type: SET_PRELOADER_STATE_STATES_USERS,
    stateFetch,
  }
}

//Breadcrumb actions
const menuSelectorLapse = function menuSelectorLapse(value) {
  return {
    type: MENU_SELECTOR_LAPSE_STATES,
    value,
  }
}

const showState = function showState(value) {
  return {
    type: SHOW_STATE,
    value,
  }
}

const showSearchState = function showSearchState(value) {
  return {
    type: SEARCH_STATES,
    value,
  }
}

const statesSuggestions = function statesSuggestions(value) {
  return {
    type: STATES_SUGGESTIONS,
    value,
  }
}

const selectedState = function selectedState(state) {
  return {
    type: SELECTED_STATE,
    state,
  }
}

const showRegion = function showRegion(value) {
  return {
    type: SHOW_REGION_STATES,
    value,
  }
}

const showSearchRegion = function showSearchRegion(value) {
  return {
    type: SEARCH_REGION_STATES,
    value,
  }
}

const regionSuggestions = function regionSuggestions(value) {
  return {
    type: REGION_SUGGESTIONS_STATES,
    value,
  }
}

const selectedRegion = function selectedRegion(region) {
  return {
    type: SELECTED_REGION_STATES,
    region,
  }
}

const modalCalendar = function modalCalendar(value) {
  return {
    type: MODAL_CALENDAR_STATES,
    value,
  }
}

const setCalendarDateStart = function setCalendarDateStart(value) {
  return {
    type: SET_CALENDAR_DATE_START_STATES,
    value,
  }
}

const setCalendarDateEnd = function setCalendarDateEnd(value) {
  return {
    type: SET_CALENDAR_DATE_END_STATES,
    value,
  }
}
const setSelectedTimeLapse = function setSelectedTimeLapse(value) {
  return {
    type: SET_SELECTED_TIME_LAPSE_STATES,
    value,
  }
}
const regionInputChange = function regionInputChange(value) {
  return {
    type: REGION_INPUT_CHANGE_STATES,
    value,
  }
}

const stateInputChange = function stateInputChange(value) {
  return {
    type: STATES_INPUT_CHANGE,
    value,
  }
}

const fillRegionsWithResquest = function fillRegionsWithResquest(regions) {
  return {
    type: REGION_SUCCESS_STATES,
    regions,
  }
}
const fillStatesWithResquest = function fillStatesWithResquest(states) {
  return {
    type: STATES_SUCCESS,
    states,
  }
}
const regionRequest = function regionRequest(value, groupId) {
  return {
    type: REGION_REQUESTING_STATES,
    value,
    groupId,
  }
}

const statesRequest = function statesRequest(IDREGION, IDGROUP) {
  return {
    type: STATES_REQUESTING,
    IDREGION,
    IDGROUP,
  }
}

const statisticsErlangRequest = function statisticsErlangRequest(value) {
  return {
    type: STATISTICS_REQUESTING_STATES_ERLANG,
    value,
  }
}
const statisticsPayloadRequest = function statisticsPayloadRequest(value) {
  return {
    type: STATISTICS_REQUESTING_STATES_PAYLOAD,
    value,
  }
}
const statisticsCcrRequest = function statisticsCcrRequest(value) {
  return {
    type: STATISTICS_REQUESTING_STATES_CCR,
    value,
  }
}
const statisticsPcrRequest = function statisticsPcrRequest(value) {
  return {
    type: STATISTICS_REQUESTING_STATES_PCR,
    value,
  }
}
const statisticsUsersRequest = function statisticsUsersRequest(value) {
  return {
    type: STATISTICS_REQUESTING_STATES_USERS,
    value,
  }
}

const statisticsRequest = function statisticsRequest(value) {
  return {
    type: STATISTICS_REQUESTING_STATES_CONSULT,
    value,
  }
}
const setChartOptionsErlang = function setChartOptionsErlang(value) {
  return {
    type: SET_CHART_OPTIONS_STATES_ERLANG,
    value,
  }
}
const setChartOptionsPayload = function setChartOptionsPayload(value) {
  return {
    type: SET_CHART_OPTIONS_STATES_PAYLOAD,
    value,
  }
}
const setChartOptionsCcr = function setChartOptionsCcr(value) {
  return {
    type: SET_CHART_OPTIONS_STATES_CCR,
    value,
  }
}
const setChartOptionsPcr = function setChartOptionsPcr(value) {
  return {
    type: SET_CHART_OPTIONS_STATES_PCR,
    value,
  }
}
const setChartOptionsUser = function setChartOptionsUser(value) {
  return {
    type: SET_CHART_OPTIONS_STATES_USERS,
    value,
  }
}

const setSelectedGroup = function setSelectedGroup(group) {
  return {
    type: SELECTED_GROUP_STATES,
    group,
  }
}

const setSetStateGroupMenu = function setSetStateGroupMenu(value) {
  return {
    type: SET_STATE_GROUP_MENU_STATES,
    value,
  }
}

const changeConsultState = function changeConsultState(value) {
  return {
    type: CHANGE_CONSULT_STATE_STATES,
    value,
  }
}

const setChartOptions = function setChartOptions(value) {
  return {
    type: SET_CHART_OPTIONS_STATES_CONSULT,
    value,
  }
}

const setStateChartOptions = function setStateChartOptions(value) {
  return {
    type: SET_STATE_CHART_OPTIONS_STATES_CONSULT,
    value,
  }
}

const selectedService = function selectedService(value) {
  return {
    type: SELECTED_SERVICE_STATES_CONSULT,
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
  showState,
  showSearchState,
  statesSuggestions,
  selectedState,
  showRegion,
  showSearchRegion,
  regionSuggestions,
  selectedRegion,
  modalCalendar,
  setCalendarDateStart,
  setCalendarDateEnd,
  setSelectedTimeLapse,
  regionInputChange,
  stateInputChange,
  fillRegionsWithResquest,
  fillStatesWithResquest,
  regionRequest,
  statesRequest,
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
