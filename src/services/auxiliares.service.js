import http from "@/http-common";
import authHeader from "./auth-header";

class AuxiliarService {
	getRolesUsers() {
		return http.get("auxiliares/roles-usuarios", {
			headers: authHeader(),
		});
	}

	getDistritos() {
		return http.get("auxiliares/distritos", {
			headers: authHeader(),
		});
	}

	getTipoCarga() {
		return http.get("auxiliares/tipos-de-carga", {
			headers: authHeader(),
		});
	}

	getTipoComprobante() {
		return http.get("auxiliares/tipos-de-comprobantes", {
			headers: authHeader(),
		});
	}

	getTipoEnvio() {
		return http.get("auxiliares/tipos-de-envios", {
			headers: authHeader(),
		});
	}

	getFormasPago() {
		return http.get("auxiliares/formas-de-pago", {
			headers: authHeader(),
		});
	}

	getModalidad() {
		return http.get("auxiliares/modalidad", {
			headers: authHeader(),
		});
	}

	getRangosMoB() {
		return http.get("auxiliares/rangos-MoBiker", {
			headers: authHeader(),
		});
	}

	getRolCliente() {
		return http.get("auxiliares/roles-clientes", {
			headers: authHeader(),
		});
	}
}

export default new AuxiliarService();
