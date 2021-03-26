<template>
	<div class="w-full max-h-screen p-4 bg-gray-100 rounded-xl mt-10">
		<div class="flex justify-end">
			<h1
				class="inline-block text-2xl text-primary text-center font-bold mb-4 rounded-xl relative -top-12 py-2 bg-gray-100 px-6"
			>
				Tablero de Clientes
			</h1>
		</div>

		<div class="flex flex-row justify-evenly -mt-10 mb-4">
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
					class="bg-white ml-2 py-1 px-2 rounded font-bold hover:bg-info hover:text-white focus:outline-none"
					@click="searchCliente"
				>
					Buscar
				</button>
			</div>

			<button
				class="bg-yellow-600 hover:bg-yellow-500 px-4 rounded-full focus:outline-none"
				@click="refreshList"
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

		<div class="grid grid-cols-2 gap-x-2">
			<div
				class="inline-grid grid-cols-4 text-sm text-center font-bold items-center"
			>
				<p>Empresa</p>
				<p>Contacto</p>
				<p>Distrito</p>
				<p>Editar</p>
			</div>

			<div
				class="inline-grid grid-cols-3 text-sm text-center font-bold items-center cursor-pointer"
			>
				<div
					class="hover:bg-info py-2 hover:text-white rounded-t-xl"
					:class="{ 'bg-info text-white': activeTabName === tabNames.detalles }"
					@click="handleTabClick(tabNames.detalles)"
				>
					Detalles
				</div>
				<div
					class="hover:bg-info py-2 hover:text-white rounded-t-xl"
					:class="{
						'bg-info text-white': activeTabName === tabNames.biciEnvios,
					}"
					@click="handleTabClick(tabNames.biciEnvios)"
				>
					Bicienvios
				</div>
				<div
					class="hover:bg-info py-2 hover:text-white rounded-t-xl"
					:class="{
						'bg-info text-white': activeTabName === tabNames.ecoamigable,
					}"
					@click="handleTabClick(tabNames.ecoamigable)"
				>
					Ecoamigable
				</div>
			</div>

			<div class="bg-white overscroll-auto border border-black">
				<div
					class="grid grid-cols-4 h-14 text-center text-sm py-2 hover:bg-info border-b-2 border-primary items-center cursor-default"
					:class="{
						'bg-info text-white font-bold': cliente.id == currentIndex,
					}"
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

			<div class="h-96 border border-black">
				<Component
					:is="currentTab"
					:estadisticas="currentCliente"
					:pedidos="pedidosCliente"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import ClienteService from "@/services/cliente.service";
import ClienteDetalles from "@/components/ClienteDetalles.vue";
import BaseBiciEnvios from "@/components/BaseBiciEnvios.vue";
import BaseEcoamigable from "@/components/BaseEcoamigable.vue";

const tabNames = {
	detalles: "detalles",
	biciEnvios: "bicienvios",
	ecoamigable: "ecoamigable",
};

export default {
	data() {
		return {
			clientes: [],
			pedidosCliente: [],
			currentCliente: null,
			currentIndex: -1,
			buscador: "",
			currentTab: null,
			tabNames,
			tabs: {
				[tabNames.detalles]: ClienteDetalles,
				[tabNames.biciEnvios]: BaseBiciEnvios,
				[tabNames.ecoamigable]: BaseEcoamigable,
			},
			activeTabName: null,
		};
	},
	components: {
		ClienteDetalles,
		BaseBiciEnvios,
		BaseEcoamigable,
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

		retrievePedidosCliente(id) {
			ClienteService.getPedidosDelCliente(id).then(
				(response) => {
					this.pedidosCliente = response.data;
				},
				(error) => {
					this.pedidosCliente =
						(error.response && error.response.data) ||
						error.message ||
						error.toString();
				}
			);
		},

		handleTabClick(tabName) {
			this.activeTabName = tabName;
			this.currentTab = this.tabs[tabName];
		},

		refreshList() {
			this.retrieveClientes();

			this.currentCliente = null;
			this.currentIndex = -1;
		},

		setActiveCliente(cliente, index) {
			this.currentCliente = cliente;
			this.currentIndex = index;
			this.handleTabClick(tabNames.detalles);
			this.retrievePedidosCliente(index);
		},

		async searchCliente() {
			try {
				let clientesFiltrados = await ClienteService.searchCliente(
					this.buscador
				);

				this.clientes = clientesFiltrados.data;
				this.buscador = "";
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>
