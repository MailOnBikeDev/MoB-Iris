<template>
	<div class="w-full p-4">
		<h1 class="text-primary bg-white w-full font-bold text-2xl p-2">
			Clientes
		</h1>

		<div class="grid grid-cols-1 bg-gray-200">
			<router-link to="/clientes/nuevo-cliente" custom v-slot="{ navigate }">
				<span @click="navigate" role="link" class="text-center cursor-pointer"
					>Crear nuevo cliente</span
				>
			</router-link>
		</div>

		<div class="grid grid-cols-3 gap-4 mt-4">
			<div class="bg-white p-8" v-for="cliente in clientes" :key="cliente.id">
				<div class="block">
					<p>
						<span class="resalta">ID: </span>
						<span>{{ cliente.id }}</span>
					</p>

					<p>
						<span class="resalta">Contacto: </span>
						<span>{{ cliente.contacto }}</span>
					</p>

					<p>
						<span class="resalta">Empresa: </span>
						<span>{{ cliente.empresa }}</span>
					</p>

					<p>
						<span class="resalta">Dirección: </span>
						<span>{{ cliente.direccion }}</span>
					</p>

					<p>
						<span class="resalta">Distrito: </span>
						<span>{{ cliente.distrito.distrito }}</span>
					</p>

					<p>
						<span class="resalta">Teléfono: </span>
						<span>{{ cliente.telefono }}</span>
					</p>

					<p>
						<span class="resalta">Otro Dato: </span>
						<span>{{ cliente.otroDato }}</span>
					</p>

					<p>
						<span class="resalta">Tipo de Carga: </span>
						<span>{{ cliente.tipoDeCarga.tipo }}</span>
					</p>

					<p>
						<span class="resalta">Rol: </span>
						<span>{{ cliente.rolCliente.rol }}</span>
					</p>

					<p>
						<span class="resalta">Forma de Pago: </span>
						<span>{{ cliente.formaDePago.pago }}</span>
					</p>

					<p>
						<span class="resalta">Comprobante: </span>
						<span>{{ cliente.tipoDeComprobante.tipo }}</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ClienteService from "@/services/cliente.service";

export default {
	data() {
		return {
			clientes: [],
		};
	},
	mounted() {
		ClienteService.getClientes().then(
			(response) => {
				this.clientes = response.data;
			},
			(error) => {
				this.clientes =
					(error.response && error.response.data) ||
					error.message ||
					error.toString();
			}
		);
	},
};
</script>
