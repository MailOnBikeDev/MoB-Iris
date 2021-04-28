import axios from "axios";

let user = JSON.parse(localStorage.getItem("user"));

export default axios.create({
	baseURL: process.env.VUE_APP_HERMES,
	headers: {
		"Content-type": "application/json",
		"x-access-token": user ? user.accessToken : "",
	},
});
