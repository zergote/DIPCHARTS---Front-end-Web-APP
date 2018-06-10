import { takeLatest, call, put } from "redux-saga/effects";
import { delay } from "redux-saga";
import { SIGNUP_REQUESTING, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./constants";
import { API_URL_STATISTICS } from "../client/constants";
// Helper para manejar los errores de la API
import { handleApiErrors } from "../../lib/api-errors";

// Constantes para el registro y el logueo
import {
  REGION_REQUESTING,
  REGION_SUCCESS,
  REGION_ERROR,
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CHANGE_TO_LOGIN,
  RESET_FLATS
} from "./constants";

// Para que podamos modificar el estado de nuestro Cliente.
import { setClient, unsetClient } from "../client/actions";

import { API_URL_USERS, CLIENT_UNSET_RESQUEST } from "../client/constants";

import createHistory from "history/createBrowserHistory";

// Crear un historial, se usará para redireccionar a diferentes rutas del sitio
const history = createHistory();

// Las urls que usaremos para acceder a los recursos de la API
const signupUrl = `${API_URL_USERS}/register`;
const loginUrl = `${API_URL_USERS}/signin`;
const regionUrl = `${API_URL_STATISTICS}/region`;

function loginApi(USER_NAME, PASSWORD) {
  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ USER_NAME, PASSWORD })
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch(error => {
      throw error;
    });
}

function* regionFlow() {
  try {
    let regions = yield call(regionApi);
    yield put({ type: REGION_SUCCESS, regions });
    yield call(delay, 4000);
    yield put({ type: RESET_FLATS });
  } catch (error) {
    // Si hay error? se almacena en redux
    yield put({ type: REGION_ERROR, error });
  }
}

function regionApi() {
  return fetch(regionUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch(error => {
      throw error;
    });
}

function* loginFlow(action) {
  try {
    const { USER_NAME, PASSWORD } = action;
    let token;
    let response;
    let message;
    if (USER_NAME === undefined) {
      const error = {
        toString: () => "No has introducido tu nombre de usuario"
      };
      throw error;
    }

    if (PASSWORD === undefined) {
      const error = {
        toString: () => "No has introducido tu contraseña"
      };
      throw error;
    }

    response = yield call(loginApi, USER_NAME, PASSWORD);
    token = response.token;
    message = response.message;
    yield call(delay, 1000);
    // Se informa a redux que se ha validado un nuevo usuario y ser fija en el clienta para que desbloquee
    // el acceso
    if (token) {
      yield put(setClient(token));

      // ... y tambien se le informa a redux que el logueo ha sido exitoso
      yield put({ type: LOGIN_SUCCESS });

      // se guarda en el localstorage del navegador un token, esto evitara que tengas que loguearte de nuevo
      // si cierras la aplicacion. El token es valido por 1 hora.
      localStorage.setItem("token", JSON.stringify(token));

      yield put({ type: RESET_FLATS });
      return token;
    } else {
      let error = message;
      throw error;
    }
  } catch (error) {
    // error? se envia a redux
    yield put({ type: LOGIN_ERROR, error });
  }
}

function signupApi(
  ID_REGION,
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  USER_NAME,
  PASSWORD
) {
  /* eslint-disable */
  let emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /* eslint-enable */
  if (ID_REGION === undefined) {
    const error = {
      toString: () => "No has seleccionado region"
    };
    throw error;
  }

  if (FIRST_NAME === undefined) {
    const error = {
      toString: () => "No has introducido tu nombre"
    };
    throw error;
  }

  if (LAST_NAME === undefined) {
    const error = {
      toString: () => "No has introducido tu apellido"
    };
    throw error;
  }

  if (!emailFormat.test(EMAIL)) {
    const error = {
      toString: () => "Tu email es incorrecto"
    };
    throw error;
  }

  if (USER_NAME === undefined) {
    const error = {
      toString: () => "No has introducido tu nombre de usuario"
    };
    throw error;
  }

  if (PASSWORD === undefined) {
    const error = {
      toString: () => "No has elegido una contraseña"
    };
    throw error;
  }

  // Llamaremos a "fecth" que es una funciona nativa en los navegadores
  return fetch(signupUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ID_REGION,
      FIRST_NAME,
      LAST_NAME,
      EMAIL,
      USER_NAME,
      PASSWORD
    })
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch(error => {
      throw error;
    });
}

// Esto se ejecutará cuando el se haga la peticion para el registro
// La acción siempre sera atrapada encontrada por el watcher
function* signupFlow(action) {
  try {
    const {
      ID_REGION,
      FIRST_NAME,
      LAST_NAME,
      EMAIL,
      USER_NAME,
      PASSWORD
    } = action;
    // Empuja la "llamada" a nuestro signupApi con el correo electrónico y la contraseña
    // contenida en la acción, luego se envia y se PAUSA aquí hasta que la función API
    // asyncronica sea completada!
    const response = yield call(
      signupApi,
      ID_REGION,
      FIRST_NAME,
      LAST_NAME,
      EMAIL,
      USER_NAME,
      PASSWORD
    );

    if (response) {
      yield put({ type: SIGNUP_SUCCESS, response });
      yield call(delay, 2000);
      yield put({ type: CHANGE_TO_LOGIN });
    }
  } catch (error) {
    // Si la llamada a la API para el registro falla, se despachara SIGNUP_ERROR junto con el mensaje de error
    yield put({ type: SIGNUP_ERROR, error });
  }
}

function* logoutFlow(action) {
  try {
    // Se elimina la información del cliente en el navegador
    yield call(delay, 500);
    yield put(unsetClient());

    // Se remove el token del navegador
    localStorage.removeItem("token");

    // Redirecciona a la pantalla de logueo
    history.push("/");
  } catch (error) {
    throw error;
  }
}

// Nuestra Watchers de la saga estaran pendiente de la solicitud de ejecutar procesos
function* loginWatcher() {
  yield takeLatest(LOGIN_REQUESTING, loginFlow);
}

function* signupWatcher() {
  yield takeLatest(SIGNUP_REQUESTING, signupFlow);
}

function* logoutWatcher() {
  yield takeLatest(CLIENT_UNSET_RESQUEST, logoutFlow);
}

function* regionWatcher() {
  yield takeLatest(REGION_REQUESTING, regionFlow);
}
export { loginWatcher, signupWatcher, logoutWatcher, regionWatcher };
