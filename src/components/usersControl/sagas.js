import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  SET_FETCH_STATE_USERS,
} from './constants'
import { takeLatest, call, put } from 'redux-saga/effects'
import { API_URL_USERS } from '../client/constants'
import axios from 'axios'
const apiUsersAllurl = `${API_URL_USERS}/all`
const apiUserUpdateUrl = `${API_URL_USERS}/`
const apiUserDeleteUrl = `${API_URL_USERS}/`

async function usersAllApi() {
  return axios({
    method: 'get',
    url: apiUsersAllurl,
    params: { HTTP_CONTENT_LANGUAGE: 'JSON' },
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => {
      return response.data
    })
    .catch(function(error) {
      console.log(error)
      return {}
    })
}

function usersUpdateApi(id, data) {
  let dataFixedTypes = data
  if (typeof dataFixedTypes.ACTIVE_STATUS !== 'boolean')
    dataFixedTypes.ACTIVE_STATUS = dataFixedTypes.ACTIVE_STATUS === 'true'
  dataFixedTypes.USER_LEVEL = parseInt(dataFixedTypes.USER_LEVEL, 10)
  return fetch(`${apiUserUpdateUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...dataFixedTypes }),
  })
    .then(response => response.json())
    .then(json => json)
    .catch(error => {
      throw error
    })
}

function* getUsersFlow() {
  try {
    let value = false
    yield put({ type: SET_FETCH_STATE_USERS, value })

    let users = yield call(usersAllApi)
    yield put({ type: GET_USERS_SUCCESS, users })
    value = true
    yield put({ type: SET_FETCH_STATE_USERS, value })
  } catch (error) {
    let value = true
    yield put({ type: SET_FETCH_STATE_USERS, value })
    let users = {}
    yield put({ type: GET_USERS_SUCCESS, users })
  }
}

function* updateUserFlow(action) {
  try {
    let userMod = action.userMod
    let id = userMod.ID
    let objectKey = action.objectKey
    yield call(usersUpdateApi, id, userMod)
    yield put({ type: UPDATE_USER_SUCCESS, userMod, objectKey })
    //const getUsers = yield call(getUsersFlow)
  } catch (error) {
    console.log(error)
  }
}

function usersDeleteApi(id) {
  return fetch(`${apiUserDeleteUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(json => json)
    .catch(error => {
      throw error
    })
}

function* deleteUserFlow(action) {
  try {
    let id = action.id
    let objectKey = action.objectKey
    yield put({ type: DELETE_USER_SUCCESS, objectKey })
    yield call(usersDeleteApi, id)
    //const getUsers = yield call(getUsersFlow)
  } catch (error) {
    console.log(error)
  }
}

function* getUsersWatcher() {
  yield takeLatest(GET_USERS_REQUEST, getUsersFlow)
}

function* updateUserWatcher() {
  yield takeLatest(UPDATE_USER_REQUEST, updateUserFlow)
}

function* deleteUserWatcher() {
  yield takeLatest(DELETE_USER_REQUEST, deleteUserFlow)
}

export { getUsersWatcher, updateUserWatcher, deleteUserWatcher }
