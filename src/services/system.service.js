import http from "@/http-common";
import authHeader from "./auth-header";

class SystemService {
	getFinanzas() {
		return http.get("admin", { headers: authHeader() });
	}
}

export default new SystemService();
