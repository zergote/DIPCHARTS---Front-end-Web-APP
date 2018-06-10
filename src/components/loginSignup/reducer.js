import {
  REGION_REQUESTING,
  REGION_SUCCESS,
  REGION_ERROR,
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CHANGE_TO_SIGNUP,
  CHANGE_TO_LOGIN,
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  RESET_FLATS
} from "./constants";

const initialState = {
  requestingL: false,
  successfulL: false,
  messagesL: [],
  errorsL: [],
  requestingS: false,
  successfulS: false,
  messagesS: [],
  errorsS: [],
  screenSignup: false,
  regions: { sinconexion: { ID: null, REGION: "CARGANDO..." } }
};

const reducer = function LoginSignup(state = initialState, action) {
  switch (action.type) {
    // Configura el indicador de solicitud y adjunte un mensaje para que se muestre
    case LOGIN_REQUESTING:
      return {
        ...state,
        requestingL: true,
        successfulL: false,
        messagesL: [{ body: "Logging in...", time: new Date() }],
        errorsL: []
      };

    // ¿Tuvo éxito?  Restablecer el estado de inicio de sesión.
    case LOGIN_SUCCESS:
      return {
        ...state,
        errorsL: [],
        messagesL: [],
        requestingL: false,
        successfulL: true
      };

    // Añadir el error devuelto de nuestra api
    // Fija el éxito y fija las flags en falso.
    case LOGIN_ERROR:
      return {
        ...state,
        errorsL: state.errorsL.concat([
          {
            body: action.error.toString(),
            time: new Date()
          }
        ]),
        messagesL: [],
        requestingL: false,
        successfulL: false
      };

    case SIGNUP_REQUESTING:
      return {
        ...state,
        requestingS: true,
        successfulS: false,
        messagesS: [{ body: "Signing up...", time: new Date() }],
        errorsS: []
      };

    // Restablece el estado y añade un mensaje de éxito!
    // recuerde que nuestra carga útil devuelta será exitosa:
    // {"email":"del nuevo usuario","id":"del usuario"}
    case SIGNUP_SUCCESS:
      return {
        ...state,
        errorsS: [],
        messagesS: [
          {
            body: `${
              action.response.firstName
            } tu cuenta ha sido creada, espera por la activación`,
            time: new Date()
          }
        ],
        requestingS: false,
        successfulS: true
      };

    // Se recibe un mensaje de error basico,
    // Podrian hacerse mensajes mas detallados.
    case SIGNUP_ERROR:
      return {
        ...state,
        errorsS: state.errorsS.concat([
          {
            body: action.error.toString(),
            time: new Date()
          }
        ]),
        messagesS: [],
        requestingS: false,
        successfulS: false
      };

    case CHANGE_TO_SIGNUP:
      return { ...state, screenSignup: true };

    case CHANGE_TO_LOGIN:
      return { ...state, screenSignup: false };

    case REGION_REQUESTING:
      return {
        ...state,
        requestingS: true,
        successfulS: false,
        messagesS: [{ body: "Cargando regiones...", time: new Date() }],
        errorsS: []
      };

    case REGION_SUCCESS:
      return {
        ...state,
        errorsS: [],
        messagesS: [
          {
            body: "Regiones cargadas",
            time: new Date()
          }
        ],
        requestingS: false,
        successfulS: true,
        regions: action.regions
      };
    case REGION_ERROR:
      return {
        ...state,
        errorsS: state.errorsS.concat([
          {
            body: action.error.toString(),
            time: new Date()
          }
        ]),
        messagesS: [],
        requestingS: false,
        successfulS: false
      };
    case RESET_FLATS:
      return {
        ...state,
        requestingL: false,
        successfulL: false,
        messagesL: [],
        errorsL: [],
        requestingS: false,
        successfulS: false,
        messagesS: [],
        errorsS: []
      };
    default:
      return state;
  }
};

export default reducer;
