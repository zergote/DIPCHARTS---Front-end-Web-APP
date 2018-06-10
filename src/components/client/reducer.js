// Aca se almacena la información del usuario luego que ingresa.
// La información es recibida desde el servidor y se guarda temporalmente
// aquí para su uso en diferentes partes de la aplicación y para validar
// acceso a diferentes secciones
import { CLIENT_SET, CLIENT_UNSET } from "./constants";
import jwtDecode from "jwt-decode";

const initialSate = {
	user: null,
	/*
	//Descomentar para pasar de la pantalla de auntenticación en las labores de desarrollo
	user: {
		ID: 0,
		USER_NAME: "Zergote",
		FIRST_NAME: "Christian",
		LAST_NAME: "Yanez",
		ROL: "Especialista",
		EMAIL: "xyges@hotmail.com",
		USER_LEVEL: 0,
		ID_REGION: 5,
		REGION: "Oriente"
	},
	token: null
*/
	token: null
};

const reducer = function clientReducer(state = initialSate, action) {
	switch (action.type) {
		case CLIENT_SET:
			let tokenDecode = jwtDecode(action.token);
			return {
				...state,
				token: action.token,
				user: tokenDecode
			};

		case CLIENT_UNSET:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				user: null
			};

		default:
			return state;
	}
};

export default reducer;
