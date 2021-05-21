import axios from "axios";

export default async function consultarApi(
	origen,
	distritoOrigen,
	destino,
	distritoDestino
) {
	const start = `${origen.replace(/ /g, "+")}+${distritoOrigen.replace(
		/ /g,
		"+"
	)}`;

	const end = `${destino.replace(/ /g, "+")}+${distritoDestino.replace(
		/ /g,
		"+"
	)}`;

	const Maps_API = "https://maps.googleapis.com/maps/api/distancematrix";
	// const Maps_API = "http://maps.googleapis.com/maps/api/distancematrix";

	const API_URL = `${Maps_API}/json?&origins=${start}&destinations=${end}&mode=walking&key=${process.env.VUE_APP_MAPS_API_KEY}`;

	const distancia = await axios.get(API_URL);
	console.log(`Distancia: ${distancia}`);

	const distanciaCalculada =
		distancia.data.rows[0].elements[0].distance.value / 1000;

	console.log(`distancia calculada: ${distanciaCalculada}`);

	return distanciaCalculada;
}
