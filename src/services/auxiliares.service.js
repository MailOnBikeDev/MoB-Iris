import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/hermes/";

class AuxiliarService {
	getRolesUsers() {
		return axios.get(API_URL + "auxiliares/roles-usuarios", {
			headers: authHeader(),
		});
	}

	getDistritos() {
		return axios.get(API_URL + "auxiliares/distritos", {
			headers: authHeader(),
		});
	}

	getTipoCarga() {
		return axios.get(API_URL + "auxiliares/tipos-de-carga", {
			headers: authHeader(),
		});
	}

	getTipoComprobante() {
		return axios.get(API_URL + "auxiliares/tipos-de-comprobantes", {
			headers: authHeader(),
		});
	}

	getTipoEnvio() {
		return axios.get(API_URL + "auxiliares/tipos-de-envios", {
			headers: authHeader(),
		});
	}

	getFormasPago() {
		return axios.get(API_URL + "auxiliares/formas-de-pago", {
			headers: authHeader(),
		});
	}

	getModalidad() {
		return axios.get(API_URL + "auxiliares/modalidad", {
			headers: authHeader(),
		});
	}

	getRangosMoB() {
		return axios.get(API_URL + "auxiliares/rangos-MoBiker", {
			headers: authHeader(),
		});
	}

	getRolCliente() {
		return axios.get(API_URL + "auxiliares/roles-clientes", {
			headers: authHeader(),
		});
	}
}

export default new AuxiliarService();
