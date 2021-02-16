import http from "@/http-common";
import authHeader from "./auth-header";

class SystemService {
	getPedidos() {
		return http.get("pedidos/tablero-pedidos", {
			headers: authHeader(),
		});
	}

	getMobikers() {
		return http.get("mobikers/equipo-mobiker", {
			headers: authHeader(),
		});
	}

	getFinanzas() {
		return http.get("admin", { headers: authHeader() });
	}
}

export default new SystemService();
