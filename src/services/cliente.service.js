import http from "@/http-common";
import authHeader from "./auth-header";

class ClienteService {
	async getClientes() {
		try {
			let clientes = await http.get("clientes/tablero-clientes", {
				headers: authHeader(),
			});

			return clientes;
		} catch (error) {
			console.error(error);
		}
	}

	async storageNuevoCliente(nuevoCliente) {
		try {
			let cliente = await http.post("clientes/crear-nuevo-cliente", {
				contacto: nuevoCliente.contacto,
				empresa: nuevoCliente.empresa,
				telefono: nuevoCliente.telefono,
				direccion: nuevoCliente.direccion,
				otroDato: nuevoCliente.otroDato,
				distrito: nuevoCliente.distrito,
				comprobante: nuevoCliente.comprobante,
				rol: nuevoCliente.rol,
				carga: nuevoCliente.carga,
				pago: nuevoCliente.pago,
				ruc: nuevoCliente.ruc,
				email: nuevoCliente.email,
			});

			return cliente;
		} catch (error) {
			console.error(error);
		}
	}

	async searchCliente(findCliente) {
		try {
			let cliente = await http.get("clientes/buscador-clientes", findCliente);

			return cliente;
		} catch (error) {
			console.error(error);
		}
	}
}

export default new ClienteService();
