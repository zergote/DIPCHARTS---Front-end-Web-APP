// En caso de generarse un error en la comunicación con la API
// se recoje el error y este se puede mostrar por donde se desee.

export function handleApiErrors(response) {
	if (!response.ok) throw Error(response.statusText);
	return response;
}
