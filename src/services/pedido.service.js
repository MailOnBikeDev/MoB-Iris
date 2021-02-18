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
			console.error(error);
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
			console.error(error);
		}
	}
}

export default new PedidoService();
