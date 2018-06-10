import {
  UNHIDE,
  HIDE,
  OPENAMENUSETTINGS,
  CLOSEDAMENUSETTINGS,
  OPENAMENUUSER,
  CLOSEDAMENUUSER,
  OPENAMENUNOTIFICATIONS,
  CLOSEDAMENUNOTIFICATIONS,
  OPENAMENUALERTS,
  CLOSEDAMENUALERTS,
  NOTIFICATIONS_RESET_COUNT,
  ALERTS_RESET_COUNT,
  FULLSCREENMODE,
  GET_ALERTS_TOOLBAR_REQUEST,
  GET_ALERTS_TOOLBAR_SUCCESS,
  MARK_READ_ALERTS,
  ALERTS_SET_COUNT,
} from './constants'

const getAlertsToolbarSuccess = function getAlertsToolbarSuccess(value) {
  return {
    type: GET_ALERTS_TOOLBAR_SUCCESS,
    value,
  }
}

const markReadAlerts = function markReadAlerts(value) {
  return {
    type: MARK_READ_ALERTS,
    value,
  }
}

const getAlertsToolbar = function getAlertsToolbar(value) {
  return {
    type: GET_ALERTS_TOOLBAR_REQUEST,
  }
}

const fullScreenMode = function fullScreenMode(value) {
  return {
    type: FULLSCREENMODE,
    value,
  }
}
const setUnhideNav = function setUnhideNav() {
  return {
    type: UNHIDE,
  }
}

const setHideNav = function setHideNav() {
  return {
    type: HIDE,
  }
}

const setOpenAMenuSettings = function setOpenAMenuSettings() {
  return {
    type: OPENAMENUSETTINGS,
  }
}

const setClosedMenuSettings = function setClosedMenuSettings() {
  return {
    type: CLOSEDAMENUSETTINGS,
  }
}

const setOpenAMenuNotifications = function setOpenAMenuNotifications() {
  return {
    type: OPENAMENUNOTIFICATIONS,
  }
}

const setClosedMenuNotifications = function setClosedMenuNotifications() {
  return {
    type: CLOSEDAMENUNOTIFICATIONS,
  }
}

const setOpenAMenuAlerts = function setOpenAMenuAlerts() {
  return {
    type: OPENAMENUALERTS,
  }
}

const setClosedMenuAlerts = function setClosedMenuAlerts() {
  return {
    type: CLOSEDAMENUALERTS,
  }
}

const setOpenAMenuUser = function setOpenAMenuUser() {
  return {
    type: OPENAMENUUSER,
  }
}

const setClosedMenuUser = function setClosedMenuUser() {
  return {
    type: CLOSEDAMENUUSER,
  }
}

const setNotificationsResetCount = function setNotificationsResetCount() {
  return {
    type: NOTIFICATIONS_RESET_COUNT,
  }
}

const setAlertResetCount = function setAlertResetCount() {
  return {
    type: ALERTS_RESET_COUNT,
  }
}

const setAlertCount = function setAlertCount(value) {
  return {
    type: ALERTS_SET_COUNT,
    value,
  }
}

export {
  setUnhideNav,
  setHideNav,
  setOpenAMenuNotifications,
  setClosedMenuNotifications,
  setOpenAMenuAlerts,
  setClosedMenuAlerts,
  setOpenAMenuSettings,
  setClosedMenuSettings,
  setOpenAMenuUser,
  setClosedMenuUser,
  setNotificationsResetCount,
  setAlertResetCount,
  fullScreenMode,
  getAlertsToolbar,
  markReadAlerts,
  setAlertCount,
  getAlertsToolbarSuccess,
}
