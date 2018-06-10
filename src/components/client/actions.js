import { CLIENT_SET, CLIENT_UNSET, CLIENT_UNSET_RESQUEST } from "./constants";

export function setClient(token, decodeToken) {
  return {
    type: CLIENT_SET,
    token,
    decodeToken
  };
}

export function unsetClient() {
  return {
    type: CLIENT_UNSET
  };
}

export function unsetClientResquest() {
  return {
    type: CLIENT_UNSET_RESQUEST
  };
}
