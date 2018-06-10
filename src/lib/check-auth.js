import { setClient, unsetClient } from '../components/client/actions'
import jwtDecode from 'jwt-decode'
import { store } from '../containers/App'

export function checkAuthorization() {
  // attempt to grab the token from localstorage
  const storedToken = localStorage.getItem('token')

  // if it exists
  if (storedToken) {
    // parse it down into an object
    const decodeToken = jwtDecode(storedToken)

    // this just all works to compare the total seconds of the created
    // time of the token vs the ttl (time to live) seconds
    const expireDate = new Date(decodeToken.exp)
    const now = Math.round(new Date().getTime() / 1000)

    const expire = Math.round(expireDate.getTime())

    // if the token has expired return false
    // if (created > expiry) return false

    if (now > expire) {
      localStorage.removeItem('token')
      store.dispatch(unsetClient())
      return false
    }
    store.dispatch(setClient(storedToken))
    return true
  }
  return false
}
