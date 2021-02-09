import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/hermes/";

class SystemService {
	getPedidos() {
		return axios.get(API_URL + "pedidos/tablero-pedidos", {
			headers: authHeader(),
		});
	}
	getClientes() {
		return axios.get(API_URL + "clientes/tablero-clientes", {
			headers: authHeader(),
		});
	}
	getMobikers() {
		return axios.get(API_URL + "mobikers/equipo-mobiker", {
			headers: authHeader(),
		});
	}
	getFinanzas() {
		return axios.get(API_URL + "admin", { headers: authHeader() });
	}
}

export default new SystemService();
