<template>
	<div class="w-full max-h-screen p-4 bg-white mt-6 bg-opacity-30">
		<div class="flex justify-end">
			<h1
				class="inline-block bg-primary text-white text-center font-bold px-4 py-2 rounded-xl relative -top-8"
			>
				Tablero de Clientes
			</h1>
		</div>

		<div class="flex flex-row justify-evenly -mt-6 mb-4">
			<div>
				<input
					type="text"
					class="rounded text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-1"
					v-model="buscador"
					v-on:keyup.enter="searchCliente"
					placeholder="Buscar contacto o empresa..."
				/>

				<button
					type="button"
					class="bg-white ml-2 py-1 px-2 rounded font-bold hover:bg-info hover:text-white"
					@click="searchCliente"
				>
					Buscar
				</button>
			</div>

			<button
				class="bg-yellow-600 px-4 rounded-full focus:outline-none"
				@click="retrieveClientes"
			>
				<font-awesome-icon class="text-white" icon="sync-alt" />
			</button>

			<router-link
				to="/clientes/nuevo-cliente"
				class="bg-green-600 rounded-xl px-6 py-2 font-bold text-white focus:outline-none hover:bg-green-500"
				custom
				v-slot="{ navigate }"
			>
				<span @click="navigate" role="link" class="text-center cursor-pointer"
					>Crear nuevo cliente</span
				>
			</router-link>
		</div>

		<div class="grid grid-cols-2 gap-2">
			<div
				class="inline-grid grid-cols-4 text-sm text-center font-bold items-center mb-2"
			>
				<p>Empresa</p>
				<p>Contacto</p>
				<p>Distrito</p>
				<p>Editar</p>
			</div>

			<div
				class="inline-grid grid-cols-3 text-sm text-center font-bold items-center mb-2"
			>
				<p>Estadisticas</p>
				<p>Bicienvios</p>
				<p>Ecoamigable</p>
			</div>

			<div class="bg-white overscroll-auto">
				<div
					class="grid grid-cols-4 text-center text-sm py-2 hover:bg-info border-b-2 border-primary items-center cursor-default"
					:class="{ active: cliente.id == currentIndex }"
					v-for="cliente in clientes"
					:key="cliente.id"
					@click="setActiveCliente(cliente, cliente.id)"
				>
					<div class="col-span-1">
						<p>
							{{ cliente.empresa }}
						</p>
					</div>
					<div class="col-span-1">
						<p>
							{{ cliente.contacto }}
						</p>
					</div>
					<div>
						<p>
							{{ cliente.distrito.distrito }}
						</p>
					</div>
					<div class="flex justify-center">
						<router-link
							:to="`/clientes/tablero-clientes/${cliente.id}`"
							custom
							v-slot="{ navigate }"
							class="cursor-pointer"
						>
							<font-awesome-icon
								class="text-primary"
								icon="pencil-alt"
								@click="navigate"
								role="link"
							/>
						</router-link>
					</div>
				</div>
			</div>

			<div class="flex justify-center items-center bg-blue-500 h-96">
				<div>
					Graficas van aqui
					<div v-if="currentCliente">
						{{ currentCliente.empresa }}
						{{ currentCliente.contacto }}
						{{ currentCliente.distrito.distrito }}
					</div>
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
			currentCliente: null,
			currentIndex: -1,
			editModal: false,
			buscador: "",
		};
	},
	mounted() {
		this.retrieveClientes();
	},
	methods: {
		retrieveClientes() {
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

		refreshList() {
			this.retrieveClientes();

			this.currentCliente = null;
			this.currentIndex = -1;
		},

		setActiveCliente(cliente, index) {
			this.currentCliente = cliente;
			this.currentIndex = index;
		},

		async searchCliente() {
			try {
				let clientes = await ClienteService.searchCliente(this.buscador);

				this.clientes = clientes.data;
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>
