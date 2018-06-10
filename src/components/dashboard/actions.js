import {
  SET_CHANGE_TO_OTHER_VIEW_MTD_KPI,
  SET_CHANGE_TO_OTHER_VIEW_TOP_ERLANG,
  SET_CHANGE_TO_OTHER_VIEW_TOP_PAYLOAD,
  SET_CHANGE_TO_OTHER_VIEW_NEW_STATIONS,
  SET_HOVER_LEAVE_REGION_LOCK,
  SET_DROP_MENU_REGION_SELECTOR,
  SET_STATE_HI_MESSAGE,
  ERLANG_UNTIL_30_DAYS_REQUESTING,
  PAYLOAD_UNTIL_30_DAYS_REQUESTING,
  ERLANG_LATEST_12_MONTHS_REQUESTING,
  PAYLOAD_LATEST_12_MONTHS_REQUESTING,
  SUM_KPI_MONTH_COMP_REQUESTING,
  TOP_STATION_ERLANG_REQUESTING,
  TOP_STATION_PAYLOAD_REQUESTING,
  SELECTED_DASHBOARD_REGION,
  REGION_DASHBOARD_REQUESTING,
  GET_ALERTS_DASHBOARD_REQUEST,
  GET_ALERTS_DASHBOARD_SUCCESS,
} from './constants'

const getAlertsDashboardSuccess = function getAlertsDashboardSuccess(value) {
  return {
    type: GET_ALERTS_DASHBOARD_SUCCESS,
    value,
  }
}

const getAlertsDashboard = function getAlertsDashboard(value) {
  return {
    type: GET_ALERTS_DASHBOARD_REQUEST,
    value,
  }
}

const setStateHiMessage = function setStateHiMessage(value) {
  return {
    type: SET_STATE_HI_MESSAGE,
    value,
  }
}

const setHoverLeaveRegionLock = function setHoverLeaveRegionLock(value) {
  return {
    type: SET_HOVER_LEAVE_REGION_LOCK,
    value,
  }
}

const setDropMenuRegionSelector = function setDropMenuRegionSelector(value) {
  return {
    type: SET_DROP_MENU_REGION_SELECTOR,
    value,
  }
}

const setChangeToOtherViewMTDKPI = function setChangeToOtherViewMTDKPI(value) {
  return {
    type: SET_CHANGE_TO_OTHER_VIEW_MTD_KPI,
    value,
  }
}

const setChangeToOtherViewNewStations = function setChangeToOtherViewNewStations(
  value
) {
  return {
    type: SET_CHANGE_TO_OTHER_VIEW_NEW_STATIONS,
    value,
  }
}

const setChangeToOtherViewTopErlang = function setChangeToOtherViewTopErlang(
  value
) {
  return {
    type: SET_CHANGE_TO_OTHER_VIEW_TOP_ERLANG,
    value,
  }
}

const setChangeToOtherViewTopPayload = function setChangeToOtherViewTopPayload(
  value
) {
  return {
    type: SET_CHANGE_TO_OTHER_VIEW_TOP_PAYLOAD,
    value,
  }
}

const setSelectedDashboardRegion = function setSelectedDashboardRegion(region) {
  return {
    type: SELECTED_DASHBOARD_REGION,
    region,
  }
}

const getRegionsDashboard = function getRegionsDashboard() {
  return {
    type: REGION_DASHBOARD_REQUESTING,
  }
}

const getTopStationsErlang = function getTopStationsErlang(value) {
  return {
    type: TOP_STATION_ERLANG_REQUESTING,
    value,
  }
}

const getTopStationsPayload = function getTopStationsPayload(value) {
  return {
    type: TOP_STATION_PAYLOAD_REQUESTING,
    value,
  }
}

const getSumKpiMonthComp = function getSumKpiMonthComp(value) {
  return {
    type: SUM_KPI_MONTH_COMP_REQUESTING,
    value,
  }
}

const getErlangUntil30Days = function getErlangUntil30Days(value) {
  return {
    type: ERLANG_UNTIL_30_DAYS_REQUESTING,
    value,
  }
}

const getPayloadUntil30Days = function getPayloadUntil30Days(value) {
  return {
    type: PAYLOAD_UNTIL_30_DAYS_REQUESTING,
    value,
  }
}

const getErlangLatest12Month = function getErlangLatest12Month(value) {
  return {
    type: ERLANG_LATEST_12_MONTHS_REQUESTING,
    value,
  }
}

const getPayloadLatest12Month = function getPayloadLatest12Month(value) {
  return {
    type: PAYLOAD_LATEST_12_MONTHS_REQUESTING,
    value,
  }
}

export {
  setChangeToOtherViewMTDKPI,
  setDropMenuRegionSelector,
  setChangeToOtherViewNewStations,
  setChangeToOtherViewTopPayload,
  setChangeToOtherViewTopErlang,
  setHoverLeaveRegionLock,
  setStateHiMessage,
  setSelectedDashboardRegion,
  getRegionsDashboard,
  getTopStationsErlang,
  getTopStationsPayload,
  getSumKpiMonthComp,
  getErlangUntil30Days,
  getPayloadUntil30Days,
  getErlangLatest12Month,
  getPayloadLatest12Month,
  getAlertsDashboard,
  getAlertsDashboardSuccess,
}
