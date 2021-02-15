export default class Cliente {
	constructor(
		contacto,
		empresa,
		telefono,
		direccion,
		email,
		otroDato,
		distrito,
		comprobante,
		rol,
		carga,
		pago,
		ruc
	) {
		this.contacto = contacto;
		this.empresa = empresa;
		this.telefono = telefono;
		this.direccion = direccion;
		this.email = email;
		this.otroDato = otroDato;
		this.distrito = distrito;
		this.comprobante = comprobante;
		this.rol = rol;
		this.carga = carga;
		this.pago = pago;
		this.ruc = ruc;
	}
}
