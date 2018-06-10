import { SHRINK, EXPAND } from './constants'

const setShrink = function setShrink() {
  return {
    type: SHRINK,
  }
}

const setExpand = function setExpand() {
  return {
    type: EXPAND,
  }
}

export { setShrink, setExpand }
