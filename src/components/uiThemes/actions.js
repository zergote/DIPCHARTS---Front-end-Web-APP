import {
  SET_THEME_DARK,
  SET_THEME_WHITE,
  SET_THEME_BLUEDARK,
  SET_THEME_FROM_LOCALSTORAGE,
} from './constants.js'

const setThemeDark = function setThemeDark() {
  return {
    type: SET_THEME_DARK,
  }
}

const setThemeWhite = function setThemeWhite() {
  return {
    type: SET_THEME_WHITE,
  }
}

const setThemeBluedark = function setThemeBluedark() {
  return {
    type: SET_THEME_BLUEDARK,
  }
}

const setThemeFromLocalStorage = function setThemeFromLocalStorage(value) {
  return {
    type: SET_THEME_FROM_LOCALSTORAGE,
    value,
  }
}

export {
  setThemeDark,
  setThemeWhite,
  setThemeBluedark,
  setThemeFromLocalStorage,
}
