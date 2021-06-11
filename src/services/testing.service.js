import axios from "axios";
import authHeader from "@/services/auth-header";

const API_URL = process.env.VUE_APP_HERMES;

class TestingService {
  async testFile(file) {
    try {
        let result = await axios.post(`${API_URL}/testing/file-testing`, file,
            {
                headers: authHeader(),
                'Content-Type' : 'multipart/form-data'
            }
        );

        return result;
    } catch (error) {
        console.error(`Mensaje de error desde MobikerService: ${error.message}`);
    }
  }
}

export default new TestingService();