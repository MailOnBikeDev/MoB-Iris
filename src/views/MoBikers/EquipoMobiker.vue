<template>
	<div class="w-full max-h-screen p-4 bg-gray-100 rounded-xl mt-10">
		<div class="flex justify-end">
			<h1
				class="inline-block text-2xl text-primary text-center font-bold mb-4 rounded-xl relative -top-12 py-2 bg-gray-100 px-6"
			>
				Equipo MoBiker
			</h1>
		</div>

		<div class="flex flex-row justify-evenly -mt-10 mb-4">
			<div>
				<input
					type="text"
					class="rounded text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-1"
					v-model="buscador"
					v-on:keyup.enter="searchMobiker"
					placeholder="Buscar mobiker..."
				/>

				<button
					type="button"
					class="bg-white ml-2 py-1 px-2 rounded font-bold hover:bg-info hover:text-white focus:outline-none"
					@click="searchMobiker"
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
				to="/mobikers/nuevo-mobiker"
				class="bg-green-600 rounded-xl px-6 py-2 font-bold text-white focus:outline-none hover:bg-green-500"
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
				class="inline-grid col-span-3 grid-cols-7 text-sm text-center font-bold items-center"
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
				class="inline-grid col-span-2 grid-cols-3 text-sm text-center font-bold items-center cursor-pointer"
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

			<div
				class="pedidos-scroll bg-white overscroll-auto col-span-3 border border-black"
			>
				<div
					class="grid grid-cols-7 h-14 text-center text-sm py-2 hover:bg-info border-b-2 border-primary items-center cursor-default"
					:class="{
						'bg-info text-white font-bold': mobiker.id == currentIndex,
					}"
					v-for="mobiker in mobikers"
					:key="mobiker.id"
					@click="setActiveMobiker(mobiker, mobiker.id)"
				>
					<div>
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
							class="bg-green-500 inline-block rounded-full px-2 text-white font-bold"
						>
							{{ mobiker.status }}
						</p>
						<p
							v-else
							class="bg-gray-500 inline-block rounded-full px-2 text-white font-bold"
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

			<div class="h-96 col-span-2 border border-black">
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

const tabNames = {
	detalles: "detalles",
	biciEnvios: "bicienvios",
	ecoamigable: "ecoamigable",
};

export default {
	data() {
		return {
			mobikers: [],
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
	components: {
		MoBDetalles,
		BaseBiciEnvios,
		BaseEcoamigable,
	},
	mounted() {
		this.retrieveMobikers();
		this.currentTab = this.tabs[tabNames.detalles];
	},
	methods: {
		retrieveMobikers() {
			MobikerService.getMobikers().then(
				(response) => {
					this.mobikers = response.data;
				},
				(error) => {
					this.mobikers =
						(error.response && error.response.data) ||
						error.message ||
						error.toString();
				}
			);
		},

		retrievePedidosMobikers(id) {
			MobikerService.getPedidosDelMobiker(id).then(
				(response) => {
					this.pedidosMobiker = response.data;
				},
				(error) => {
					this.pedidosMobiker =
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
			this.retrieveMobikers();

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
				let mobikers = await MobikerService.searchMobiker(this.buscador);

				this.mobikers = mobikers.data;
				this.buscador = "";
			} catch (error) {
				console.error(error);
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
