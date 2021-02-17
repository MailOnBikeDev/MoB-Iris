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
			console.error(error);
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
			console.error(error);
		}
	}
}

export default new MobikerService();
