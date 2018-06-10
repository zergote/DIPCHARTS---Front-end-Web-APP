import { SHRINK, EXPAND } from './constants'

const initialState = {
  statitics_shrink: true,
}

const reducer = function setFoldingState(state = initialState, action) {
  switch (action.type) {
    case SHRINK:
      return Object.assign({}, state, {
        statitics_shrink: true,
      })
    case EXPAND:
      return Object.assign({}, state, {
        statitics_shrink: false,
      })

    default:
      return state
  }
}

export default reducer
