import http from "@/http-common";
import authHeader from "./auth-header";

class SystemService {
	getPedidos() {
		return http.get("pedidos/tablero-pedidos", {
			headers: authHeader(),
		});
	}

	getFinanzas() {
		return http.get("admin", { headers: authHeader() });
	}
}

export default new SystemService();
