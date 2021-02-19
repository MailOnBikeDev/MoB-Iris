<template>
	<div class="bg-white">
		<h1>buscar cliente</h1>
		<div>
			<input
				type="text"
				class="bg-blue-100 text-white"
				v-model="findCliente"
				v-on:keyup.enter="searchCliente"
			/>

			<button type="button" @click="searchCliente">
				Buscar
			</button>
		</div>

		<form>
			<input class="bg-gray-200" type="text" v-model="prueba.nombre" />
			<input class="bg-gray-200" type="text" v-model="prueba.negocio" />
			<input class="bg-gray-200" type="text" v-model="prueba.distrito" />
		</form>

		{{ prueba }}

		<div class="grid grid-cols-3 bg-gray-300">
			<div class="p-8" v-for="cliente in clientes" :key="cliente.id">
				<div>
					<h2>Contacto: {{ cliente.contacto }}</h2>
				</div>
				<div>
					<p>Empresa: {{ cliente.empresa }}</p>
				</div>
				<div>
					<p>Distrito: {{ cliente.distrito.distrito }}</p>
				</div>
			</div>
		</div>
		{{ clientes }}
	</div>
</template>

<script>
import ClienteService from "@/services/cliente.service";

export default {
	data() {
		return {
			findCliente: "",
			clientes: [],
			prueba: {
				nombre: "",
				negocio: "",
				distrito: "",
			},
		};
	},
	methods: {
		async searchCliente() {
			try {
				let clientes = await ClienteService.searchCliente(this.findCliente);

				this.clientes = clientes.data;
				this.prueba.nombre = this.clientes[0].contacto;
				this.prueba.negocio = this.clientes[0].empresa;
				this.prueba.distrito = this.clientes[0].distrito.distrito;
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>
