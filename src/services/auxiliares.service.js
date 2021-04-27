import http from "@/http-common";

class AuxiliarService {
	getRolesUsers() {
		return http.get("auxiliares/roles-usuarios");
	}

	getDistritos() {
		return http.get("auxiliares/distritos");
	}

	getTipoCarga() {
		return http.get("auxiliares/tipos-de-carga");
	}

	getTipoComprobante() {
		return http.get("auxiliares/tipos-de-comprobantes");
	}

	getTipoEnvio() {
		return http.get("auxiliares/tipos-de-envios");
	}

	getFormasPago() {
		return http.get("auxiliares/formas-de-pago");
	}

	getModalidad() {
		return http.get("auxiliares/modalidad");
	}

	getRangosMoB() {
		return http.get("auxiliares/rangos-MoBiker");
	}

	getRolCliente() {
		return http.get("auxiliares/roles-clientes");
	}

	getEntidadesBancarias() {
		return http.get("auxiliares/entidades-financieras");
	}

	getStatusPedidos() {
		return http.get("auxiliares/status");
	}
}

export default new AuxiliarService();
