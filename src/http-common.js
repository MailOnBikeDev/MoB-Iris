import axios from "axios";

let user = JSON.parse(localStorage.getItem("user"));

export default axios.create({
	baseURL: "http://localhost:8080/hermes/",
	headers: {
		"Content-type": "application/json",
		"x-access-token": user ? user.accessToken : null,
	},
});
