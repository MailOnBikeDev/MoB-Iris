import http from "@/http-common";
import authHeader from "./auth-header";

class MobikerService {
	async getMobikers() {
		try {
			let mobikers = await http.get("mobikers/equipo-mobiker", {
				headers: authHeader(),
			});

			return mobikers;
		} catch (error) {
			console.error("Mensaje de error: ", error.message);
		}
	}

	async storageNuevoMobiker(nuevoMobiker) {
		try {
			let mobiker = await http.post("mobikers/crear-nuevo-mobiker", {
				nombres: nuevoMobiker.nombres,
				apellidos: nuevoMobiker.apellidos,
				telefono: nuevoMobiker.telefono,
				telegram: nuevoMobiker.telegram,
				direccion: nuevoMobiker.direccion,
				distrito: nuevoMobiker.distrito,
				tipoDocumento: nuevoMobiker.tipoDocumento,
				numeroDocumento: nuevoMobiker.numeroDocumento,
				email: nuevoMobiker.email,
				genero: nuevoMobiker.genero,
				banco: nuevoMobiker.banco,
				tipoCuenta: nuevoMobiker.tipoCuenta,
				numeroCuentaBancaria: nuevoMobiker.numeroCuentaBancaria,
				equipo: nuevoMobiker.equipo,
				tipoBicicleta: nuevoMobiker.tipoBicicleta,
				fechaNacimiento: nuevoMobiker.fechaNacimiento,
				fechaIngreso: nuevoMobiker.fechaIngreso,
			});

			return mobiker;
		} catch (error) {
			console.error("Mensaje de error: ", error.message);
		}
	}

	async getMobikerById(id) {
		try {
			let mobiker = await http.get(`mobikers/equipo-mobiker/${id}`, {
				headers: authHeader(),
			});

			return mobiker;
		} catch (error) {
			console.error("Mensaje de error: ", error.message);
		}
	}

	async editMobiker(id, editarMobiker) {
		try {
			let mobikerEditado = await http.put(`mobikers/equipo-mobiker/${id}`, {
				nombres: editarMobiker.nombres,
				apellidos: editarMobiker.apellidos,
				telefono: editarMobiker.telefono,
				telegram: editarMobiker.telegram,
				direccion: editarMobiker.direccion,
				distrito: editarMobiker.distrito.distrito,
				tipoDocumento: editarMobiker.tipoDocumento,
				numeroDocumento: editarMobiker.numeroDocumento,
				email: editarMobiker.email,
				genero: editarMobiker.genero,
				banco: editarMobiker.banco,
				tipoCuenta: editarMobiker.tipoCuenta,
				numeroCuentaBancaria: editarMobiker.numeroCuentaBancaria,
				equipo: editarMobiker.equipo,
				tipoBicicleta: editarMobiker.tipoBicicleta,
				fechaNacimiento: editarMobiker.fechaNacimiento,
				fechaIngreso: editarMobiker.fechaIngreso,
			});

			return mobikerEditado;
		} catch (error) {
			console.error("Mensaje de error: ", error.message);
		}
	}

	async searchMobiker(findMobiker) {
		try {
			let mobiker = await http.get(`mobikers?q=${findMobiker}`, {
				headers: authHeader(),
			});

			return mobiker;
		} catch (error) {
			console.error("Mensaje de error: ", error.message);
		}
	}
}

export default new MobikerService();
