import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/hermes/";

class AuxiliarService {
	getRolesUsers() {
		return axios.get(API_URL + "auxiliares/roles-usuarios", {
			headers: authHeader(),
		});
	}
}

export default new AuxiliarService();
