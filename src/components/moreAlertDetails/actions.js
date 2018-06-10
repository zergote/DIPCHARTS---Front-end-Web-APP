import {
  SET_MODAL_OPEN_STATE,
  SET_ALERT_DATA,
  STATISTICS_REQUESTING_MORE_ALERT_DETAILS,
} from './constants'

const setAlertData = function setAlertData(value) {
  return {
    type: SET_ALERT_DATA,
    value,
  }
}

const setModalOpenState = function setModalOpenState(value) {
  console.log(value)
  return {
    type: SET_MODAL_OPEN_STATE,
    value,
  }
}

const statisticsRequest = function statisticsRequest(value) {
  return {
    type: STATISTICS_REQUESTING_MORE_ALERT_DETAILS,
    value,
  }
}

export { setModalOpenState, setAlertData, statisticsRequest }
