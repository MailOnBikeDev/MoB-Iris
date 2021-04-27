export default class User {
	constructor(fullName, username, email, empresa, password, roles) {
		this.fullName = fullName;
		this.username = username;
		this.email = email;
		this.empresa = empresa;
		this.password = password;
		this.roles = roles;
	}
}
