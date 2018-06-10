import {
  GET_USERS_SUCCESS,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  SET_FETCH_STATE_USERS,
} from './constants'
const initialSate = {
  userLevels: [1, 2],
  statusOptions: [true, false],
  users: {},
  completeFetchUsers: true,
}

const reducer = function clientReducer(state = initialSate, action) {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
      }
    case SET_FETCH_STATE_USERS:
      return {
        ...state,
        completeFetchUsers: action.value,
      }
    case UPDATE_USER_SUCCESS:
      let newUsersFromUpdate = state.users
      newUsersFromUpdate[action.objectKey] = action.userMod
      return {
        ...state,
        users: newUsersFromUpdate,
      }
    case DELETE_USER_SUCCESS:
      let newUsersFromDelete = state.users
      delete newUsersFromDelete[action.objectKey]
      return {
        ...state,
        users: newUsersFromDelete,
      }
    default:
      return state
  }
}

export default reducer
