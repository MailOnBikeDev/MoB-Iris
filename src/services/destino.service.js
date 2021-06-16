import axios from "axios";
import authHeader from "@/services/auth-header";

const API_URL = process.env.VUE_APP_HERMES;

class DestinoService {
  async getDestinos() {
    try {
      let destinos = await axios.get(`${API_URL}/destinos-recurrentes`, {
        headers: authHeader(),
      });

      return destinos;
    } catch (error) {
      console.error(`Error al obtener todos los Destinos ${error.message}`);
    }
  }

  async searchDestinos(findDestino) {
    try {
      let destino = await axios.get(`${API_URL}/destinosq=${findDestino}`, {
        headers: authHeader(),
      });

      return destino.data;
    } catch (error) {
      console.error(`Error al buscar los Destinos ${error.message}`);
    }
  }
}

export default new DestinoService();
