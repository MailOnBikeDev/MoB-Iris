import axios from "axios";
import authHeader from "@/services/auth-header";

const API_URL = process.env.VUE_APP_HERMES;
class AuthService {
  async login(user) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username: user.username,
        password: user.password,
      });

      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));

        return response.data;
      }
    } catch (error) {
      console.error(`Error al iniciar sesión: ${error.message}`);
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(user) {
    try {
      const response = await axios.post(
        `${API_URL}/registro`,
        {
          fullName: user.fullName,
          username: user.username,
          email: user.email,
          empresa: user.empresa,
          password: user.password,
          roles: user.roles,
        },
        { headers: authHeader() }
      );

      return response.data;
    } catch (error) {
      console.error(`Error al registrar nuevo usuario: ${error.message}`);
    }
  }
}

export default new AuthService();
