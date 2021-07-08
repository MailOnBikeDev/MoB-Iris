import axios from "axios";

export default async function consultarApi(
  origen,
  distritoOrigen,
  destino,
  distritoDestino
) {
  try {
    const start = `${origen.replace(/ /g, "+")}+${distritoOrigen.replace(
      / /g,
      "+"
    )}`;

    const end = `${destino.replace(/ /g, "+")}+${distritoDestino.replace(
      / /g,
      "+"
    )}`;

    const Maps_API =
      "https://maps.googleapis.com/maps/api/distancematrix/json?&mode=walking";

    const API_URL = `${Maps_API}&origins=${start}&destinations=${end}&key=${process.env.VUE_APP_MAPS_API_KEY}`;

    const distancia = await axios.get(API_URL);

    const distanciaCalculada = +(
      distancia.data.rows[0].elements[0].distance.value / 1000
    ).toFixed(1);

    return distanciaCalculada;
  } catch (error) {
    console.error(
      `Error desde el servicio Consultar API del Maps: ${error.message}`
    );
  }
}
