import http from "@/http-common";
import authHeader from "./auth-header";

class PedidoService {
	async getPedidos() {
		try {
			let pedidos = await http.get("pedidos/tablero-pedidos", {
				headers: authHeader(),
			});

			return pedidos;
		} catch (error) {
			console.error("Mensaje de error: ", error.message);
		}
	}

	async storageNuevoPedido(nuevoPedido) {
		try {
			let pedido = await http.post("pedidos/crear-nuevo-pedido", {
				fecha: nuevoPedido.fecha,
				contactoRemitente: nuevoPedido.contactoRemitente,
				empresaRemitente: nuevoPedido.empresaRemitente,
				direccionRemitente: nuevoPedido.direccionRemitente,
				distritoRemitente: nuevoPedido.distritoRemitente,
				telefonoRemitente: nuevoPedido.telefonoRemitente,
				otroDatoRemitente: nuevoPedido.otroDatoRemitente,
				contactoConsignado: nuevoPedido.contactoConsignado,
				empresaConsignado: nuevoPedido.empresaConsignado,
				direccionConsignado: nuevoPedido.direccionConsignado,
				telefonoConsignado: nuevoPedido.telefonoConsignado,
				otroDatoConsignado: nuevoPedido.otroDatoConsignado,
				tipoCarga: nuevoPedido.tipoCarga,
				formaPago: nuevoPedido.formaPago,
				tarifa: nuevoPedido.tarifa,
				comision: nuevoPedido.comision,
				distancia: nuevoPedido.distancia,
				CO2Ahorrado: nuevoPedido.CO2Ahorrado,
				ruido: nuevoPedido.ruido,
				status: nuevoPedido.status,
				statusFinanciero: nuevoPedido.statusFinanciero,
				distritoConsignado: nuevoPedido.distritoConsignado,
				mobiker: nuevoPedido.mobiker,
				tipoEnvio: nuevoPedido.tipoEnvio,
				modalidad: nuevoPedido.modalidad,
			});

			return pedido;
		} catch (error) {
			console.error("Mensaje de error: ", error.message);
		}
	}

	async getPedidoById(id) {
		try {
			let pedido = await http.get(`pedidos/tablero-pedidos/${id}`, {
				headers: authHeader(),
			});

			return pedido;
		} catch (error) {
			console.error("Mensaje de error: ", error.message);
		}
	}

	async editPedido(id, editarPedido) {
		try {
			let pedidoEditado = await http.put(`pedidos/tablero-pedidos/${id}`, {
				fecha: editarPedido.fecha,
				contactoRemitente: editarPedido.contactoRemitente,
				empresaRemitente: editarPedido.empresaRemitente,
				direccionRemitente: editarPedido.direccionRemitente,
				distritoRemitente: editarPedido.distritoRemitente,
				telefonoRemitente: editarPedido.telefonoRemitente,
				otroDatoRemitente: editarPedido.otroDatoRemitente,
				contactoConsignado: editarPedido.contactoConsignado,
				empresaConsignado: editarPedido.empresaConsignado,
				direccionConsignado: editarPedido.direccionConsignado,
				telefonoConsignado: editarPedido.telefonoConsignado,
				otroDatoConsignado: editarPedido.otroDatoConsignado,
				tipoCarga: editarPedido.tipoCarga,
				formaPago: editarPedido.formaPago,
				tarifa: editarPedido.tarifa,
				comision: editarPedido.comision,
				distancia: editarPedido.distancia,
				CO2Ahorrado: editarPedido.CO2Ahorrado,
				ruido: editarPedido.ruido,
				// status: editarPedido.status,
				// statusFinanciero: editarPedido.statusFinanciero,
				distritoConsignado: editarPedido.distrito.distrito,
				mobiker: editarPedido.mobiker.fullName,
				tipoEnvio: editarPedido.tipoDeEnvio.tipo,
				modalidad: editarPedido.modalidad.tipo,
			});

			return pedidoEditado;
		} catch (error) {
			console.error("Mensaje de error: ", error.message);
		}
	}

	async searchPedido(findPedido) {
		try {
			let pedido = await http.get(`pedidos?q=${findPedido}`, {
				headers: authHeader(),
			});

			return pedido;
		} catch (error) {
			console.error("Mensaje de error: ", error.message);
		}
	}
}

export default new PedidoService();
