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
  GET_ALERTS_TOOLBAR_SUCCESS,
  ALERTS_SET_COUNT,
} from './constants'

const initialState = {
  fullscreen: false,
  nav_show: true,
  menu_settings: false,
  menu_user: false,
  menu_notification: false,
  menu_alert: false,
  notifications_count: 6,
  alerts_count: 0,
  alerts: [],
}

const reducer = function setStateSidebar(state = initialState, action) {
  switch (action.type) {
    case FULLSCREENMODE:
      return Object.assign({}, state, {
        fullscreen: action.value,
      })

    case UNHIDE:
      return Object.assign({}, state, {
        nav_show: true,
      })

    case HIDE:
      return Object.assign({}, state, {
        nav_show: false,
      })

    case OPENAMENUNOTIFICATIONS:
      return Object.assign({}, state, {
        menu_notification: true,
      })

    case CLOSEDAMENUNOTIFICATIONS:
      return Object.assign({}, state, {
        menu_notification: false,
      })

    case OPENAMENUALERTS:
      return Object.assign({}, state, {
        menu_alert: true,
      })

    case CLOSEDAMENUALERTS:
      return Object.assign({}, state, {
        menu_alert: false,
      })

    case OPENAMENUSETTINGS:
      return Object.assign({}, state, {
        menu_settings: true,
      })

    case CLOSEDAMENUSETTINGS:
      return Object.assign({}, state, {
        menu_settings: false,
      })

    case OPENAMENUUSER:
      return Object.assign({}, state, {
        menu_user: true,
      })

    case CLOSEDAMENUUSER:
      return Object.assign({}, state, {
        menu_user: false,
      })

    case NOTIFICATIONS_RESET_COUNT:
      return Object.assign({}, state, {
        notifications_count: 0,
      })

    case ALERTS_RESET_COUNT:
      return Object.assign({}, state, {
        alerts_count: 0,
      })

    case ALERTS_SET_COUNT:
      return Object.assign({}, state, {
        alerts_count: action.value,
      })

    case GET_ALERTS_TOOLBAR_SUCCESS:
      return Object.assign({}, state, {
        alerts: action.value,
      })
    default:
      return state
  }
}

export default reducer
