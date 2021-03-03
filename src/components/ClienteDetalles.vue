<template>
	<div class="w-full h-full p-4 flex flex-col text-sm" v-if="estadisticas">
		<p class="mb-2">
			<span class="resalta">Contacto: </span>
			{{ estadisticas.contacto }}
		</p>
		<p class="mb-2">
			<span class="resalta">Empresa: </span>
			{{ estadisticas.empresa }}
		</p>
		<p class="mb-2">
			<span class="resalta">Teléfono: </span>
			{{ estadisticas.telefono }}
		</p>
		<p class="mb-2">
			<span class="resalta">Dirección: </span>
			{{ estadisticas.direccion }}
			<span class="ml-2 resalta">Distrito: </span>
			{{ estadisticas.distrito.distrito }}
		</p>
		<p class="mb-2">
			<span class="resalta">Otro Dato: </span>
			{{ estadisticas.otroDato }}
		</p>
		<p class="mb-2">
			<span class="resalta">Email: </span>
			{{ estadisticas.email }}
		</p>
		<p v-if="estadisticas.ruc" class="mb-2">
			<span class="resalta">RUC: </span>
			{{ estadisticas.ruc }}
		</p>
		<p class="mb-2">
			<span class="resalta">Tipo de Carga: </span>
			{{ estadisticas.tipoDeCarga.tipo }}
		</p>
		<p class="mb-2">
			<span class="resalta">Forma de Pago: </span>
			{{ estadisticas.formaDePago.pago }}
		</p>
		<p class="mb-2">
			<span class="resalta">Comprobante: </span>
			{{ estadisticas.tipoDeComprobante.tipo }}
		</p>
		<p class="mb-2">
			<span class="resalta">Rol: </span>
			{{ estadisticas.rolCliente.rol }}
		</p>
	</div>
</template>

<script>
export default {
	name: "ClienteDetalles",
	props: {
		estadisticas: Object,
	},
};
</script>
