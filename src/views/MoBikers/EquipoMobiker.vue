<template>
	<div class="w-full max-h-screen p-4 mt-10 bg-gray-100 rounded-xl">
		<div class="flex justify-end">
			<h1
				class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
			>
				Equipo MoBiker
			</h1>
		</div>

		<div class="flex flex-row mb-4 -mt-10 justify-evenly">
			<div>
				<input
					type="search"
					class="input"
					v-model="buscador"
					@keyup="searchMobiker"
					placeholder="Buscar mobiker..."
				/>
			</div>

			<button class="refresh-btn" @click="refreshList">
				<font-awesome-icon class="text-white" icon="sync-alt" />
			</button>

			<router-link
				to="/mobikers/nuevo-mobiker"
				class="px-6 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
				custom
				v-slot="{ navigate }"
			>
				<span @click="navigate" role="link" class="text-center cursor-pointer"
					>Crear nuevo MoBiker</span
				>
			</router-link>
		</div>

		<div class="grid grid-cols-5 gap-x-2">
			<div
				class="inline-grid items-center grid-cols-7 col-span-3 mr-2 text-sm font-bold text-center text-primary"
			>
				<p>Nombres</p>
				<p>Distrito</p>
				<p>Equipo</p>
				<p>Bicienvios</p>
				<p>Rango</p>
				<p>Estado</p>
				<p>Editar</p>
			</div>

			<div
				class="inline-grid items-center grid-cols-3 col-span-2 text-sm font-bold text-center cursor-pointer text-primary"
			>
				<div
					class="py-2 hover:bg-info hover:text-white rounded-t-xl"
					:class="{ 'bg-info text-white': activeTabName === tabNames.detalles }"
					@click="handleTabClick(tabNames.detalles)"
				>
					Detalles
				</div>
				<div
					class="py-2 hover:bg-info hover:text-white rounded-t-xl"
					:class="{
						'bg-info text-white': activeTabName === tabNames.biciEnvios,
					}"
					@click="handleTabClick(tabNames.biciEnvios)"
				>
					Bicienvios
				</div>
				<div
					class="py-2 hover:bg-info hover:text-white rounded-t-xl"
					:class="{
						'bg-info text-white': activeTabName === tabNames.ecoamigable,
					}"
					@click="handleTabClick(tabNames.ecoamigable)"
				>
					Ecoamigable
				</div>
			</div>

			<div
				class="col-span-3 overflow-y-auto bg-white border border-black pedidos-scroll max-h-96"
			>
				<div
					class="grid items-center grid-cols-7 py-2 text-sm text-center border-b-2 cursor-default h-14 hover:bg-info border-primary"
					:class="{
						'bg-info text-white font-bold': mobiker.id == currentIndex,
					}"
					v-for="mobiker in mobikersFiltrados"
					:key="mobiker.id"
					@click="setActiveMobiker(mobiker, mobiker.id)"
				>
					<div class="px-2">
						<p>
							{{ mobiker.fullName }}
						</p>
					</div>
					<div>
						<p>
							{{ mobiker.distrito.distrito }}
						</p>
					</div>
					<div>
						<p>
							{{ mobiker.equipo }}
						</p>
					</div>
					<div>
						<p>
							{{ mobiker.biciEnvios }}
						</p>
					</div>
					<div>
						<p>
							{{ mobiker.rango.rangoMoBiker }}
						</p>
					</div>
					<div>
						<p
							v-if="mobiker.status === 'Activo'"
							class="inline-block px-2 font-bold text-white bg-green-500 rounded-full"
						>
							{{ mobiker.status }}
						</p>
						<p
							v-else
							class="inline-block px-2 font-bold text-white bg-gray-500 rounded-full"
						>
							{{ mobiker.status }}
						</p>
					</div>
					<div class="flex justify-center">
						<router-link
							:to="`/mobikers/equipo-mobiker/${mobiker.id}`"
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

			<div class="col-span-2 border border-black h-96">
				<Component
					:is="currentTab"
					:estadisticas="currentMobiker"
					:pedidos="pedidosMobiker"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import MobikerService from "@/services/mobiker.service";
import MoBDetalles from "@/components/MoBDetalles.vue";
import BaseBiciEnvios from "@/components/BaseBiciEnvios.vue";
import BaseEcoamigable from "@/components/BaseEcoamigable.vue";
import { mapState, mapActions } from "vuex";

const tabNames = {
	detalles: "detalles",
	biciEnvios: "bicienvios",
	ecoamigable: "ecoamigable",
};

export default {
	data() {
		return {
			mobikersFiltrados: [],
			pedidosMobiker: [],
			currentMobiker: null,
			currentIndex: -1,
			editModal: false,
			buscador: "",
			currentTab: null,
			tabNames,
			tabs: {
				[tabNames.detalles]: MoBDetalles,
				[tabNames.biciEnvios]: BaseBiciEnvios,
				[tabNames.ecoamigable]: BaseEcoamigable,
			},
			activeTabName: null,
		};
	},
	computed: {
		...mapState("mobikers", ["mobikers"]),
	},
	components: {
		MoBDetalles,
		BaseBiciEnvios,
		BaseEcoamigable,
	},
	mounted() {
		this.mobikersFiltrados = this.mobikers;
		this.currentTab = this.tabs[tabNames.detalles];
	},
	methods: {
		...mapActions("mobikers", ["getMobikers", "buscarMobikers"]),

		async retrievePedidosMobikers(id) {
			try {
				const response = await MobikerService.getPedidosDelMobikerById(id);
				this.pedidosMobiker = response.data;
			} catch (error) {
				console.error(
					`No se pudieron obtener los pedidos del MoBiker: ${error.message}`
				);
			}
		},

		handleTabClick(tabName) {
			this.activeTabName = tabName;
			this.currentTab = this.tabs[tabName];
		},

		async refreshList() {
			await this.getMobikers();
			this.mobikersFiltrados = this.mobikers;

			this.currentMobiker = null;
			this.currentIndex = -1;
		},

		setActiveMobiker(mobiker, index) {
			this.currentMobiker = mobiker;
			this.currentIndex = index;
			this.handleTabClick(tabNames.detalles);
			this.retrievePedidosMobikers(index);
		},

		async searchMobiker() {
			try {
				this.mobikersFiltrados = await this.buscarMobikers(this.buscador);

				if (this.buscador.trim() === "") {
					this.mobikersFiltrados = this.mobikers;
				}
			} catch (error) {
				console.error(`Error en el buscador de MoBikers: ${error.message}`);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.pedidos-scroll::-webkit-scrollbar {
	width: 0.5rem;
	background: white;

	&-thumb {
		background: #52678e;
		border-radius: 1rem;
	}
}
</style>
