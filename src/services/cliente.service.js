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
			console.error("Mensaje de error: ", error.message);
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
				tipoEnvio: nuevoCliente.tipoEnvio,
			});

			return cliente;
		} catch (error) {
			console.error("Mensaje de error: ", error.message);
		}
	}

	async getClienteById(id) {
		try {
			let cliente = await http.get(`clientes/tablero-clientes/${id}`, {
				headers: authHeader(),
			});

			return cliente;
		} catch (error) {
			console.error("Mensaje de error: ", error.message);
		}
	}

	async getPedidosDelCliente(id) {
		try {
			let pedidos = await http.get(`clientes/pedidos/${id}`, {
				headers: authHeader(),
			});

			return pedidos;
		} catch (error) {
			console.error("Mensaje de error: ", error.message);
		}
	}

	async editCliente(id, clienteEditado) {
		try {
			let editarCliente = await http.put(`clientes/tablero-clientes/${id}`, {
				contacto: clienteEditado.contacto,
				empresa: clienteEditado.empresa,
				telefono: clienteEditado.telefono,
				email: clienteEditado.email,
				ruc: clienteEditado.ruc,
				distrito: clienteEditado.distrito.distrito,
				direccion: clienteEditado.direccion,
				otroDato: clienteEditado.otroDato,
				carga: clienteEditado.carga,
				pago: clienteEditado.pago,
				comprobante: clienteEditado.comprobante,
				rol: clienteEditado.rol,
				tipoEnvio: clienteEditado.tipoDeEnvio.tipo,
			});

			return editarCliente;
		} catch (error) {
			console.error("Mensaje de error: ", error.message);
		}
	}

	async searchCliente(findCliente) {
		try {
			let cliente = await http.get(`clientes?q=${findCliente}`, {
				headers: authHeader(),
			});

			return cliente;
		} catch (error) {
			console.error("Mensaje de error: ", error.message);
		}
	}
}

export default new ClienteService();
