export default class Pedido {
	constructor(
		fecha,
		contactoRemitente,
		empresaRemitente,
		direccionRemitente,
		distritoRemitente,
		telefonoRemitente,
		otroDatoRemitente,
		contactoConsignado,
		empresaConsignado,
		direccionConsignado,
		telefonoConsignado,
		otroDatoConsignado,
		tipoCarga,
		formaPago,
		tarifa,
		comision,
		distancia,
		CO2Ahorrado,
		ruido,
		status,
		statusFinanciero,
		distritoConsignado,
		mobiker,
		tipoEnvio,
		modalidad
	) {
		this.fecha = fecha;
		this.contactoRemitente = contactoRemitente;
		this.empresaRemitente = empresaRemitente;
		this.direccionRemitente = direccionRemitente;
		this.distritoRemitente = distritoRemitente;
		this.telefonoRemitente = telefonoRemitente;
		this.otroDatoRemitente = otroDatoRemitente;
		this.contactoConsignado = contactoConsignado;
		this.empresaConsignado = empresaConsignado;
		this.direccionConsignado = direccionConsignado;
		this.telefonoConsignado = telefonoConsignado;
		this.otroDatoConsignado = otroDatoConsignado;
		this.tipoCarga = tipoCarga;
		this.formaPago = formaPago;
		this.tarifa = tarifa;
		this.comision = comision;
		this.distancia = distancia;
		this.CO2Ahorrado = CO2Ahorrado;
		this.ruido = ruido;
		this.status = status;
		this.statusFinanciero = statusFinanciero;
		this.distritoConsignado = distritoConsignado;
		this.mobiker = mobiker;
		this.tipoEnvio = tipoEnvio;
		this.modalidad = modalidad;
	}
}
