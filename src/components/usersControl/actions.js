import {
  GET_USERS_REQUEST,
  UPDATE_USER_REQUEST,
  DELETE_USER_REQUEST
} from "./constants";

const getUsersRequest = function getUsersRequest() {
  return {
    type: GET_USERS_REQUEST
  };
};

const updateUserRequest = function updateUserRequest(userMod, objectKey) {
  return {
    type: UPDATE_USER_REQUEST,
    userMod,
    objectKey
  };
};

const deleteUserRequest = function deleteUserRequest(id, objectKey) {
  return {
    type: DELETE_USER_REQUEST,
    id,
    objectKey
  };
};

export { getUsersRequest, updateUserRequest, deleteUserRequest };
