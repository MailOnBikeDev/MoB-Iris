import http from "@/http-common";

class AuthService {
	login(user) {
		return http
			.post("login", {
				username: user.username,
				password: user.password,
			})
			.then((response) => {
				if (response.data.accessToken) {
					localStorage.setItem("user", JSON.stringify(response.data));
				}
				return response.data;
			});
	}
	logout() {
		localStorage.removeItem("user");
	}
	register(user) {
		return http.post("registro", {
			fullName: user.fullName,
			username: user.username,
			email: user.email,
			empresa: user.empresa,
			password: user.password,
			roles: user.roles,
		});
	}
}

export default new AuthService();
