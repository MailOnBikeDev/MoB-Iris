<template>
	<div class="w-full max-h-screen p-4 bg-white mt-6 bg-opacity-30">
		<div class="flex justify-end">
			<h1
				class="inline-block bg-primary text-white text-center font-bold px-4 py-2 rounded-xl relative -top-8"
			>
				Equipo MoBiker
			</h1>
		</div>

		<div class="flex flex-row justify-evenly -mt-6 mb-4">
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

		<div class="grid grid-cols-5 gap-2">
			<div
				class="inline-grid col-span-3 grid-cols-6 text-sm text-center font-bold items-center mb-2"
			>
				<p>Nombres</p>
				<p>Distrito</p>
				<p>Equipamiento</p>
				<p>Rango</p>
				<p>Bicienvios</p>
				<p>Editar</p>
			</div>

			<div
				class="inline-grid col-span-2 grid-cols-3 text-sm text-center font-bold items-center mb-2"
			>
				<p>Estadisticas</p>
				<p>Bicienvios</p>
				<p>Ecoamigable</p>
			</div>

			<div class="bg-white overscroll-auto col-span-3">
				<div
					class="grid grid-cols-6 text-center text-sm py-2 hover:bg-info border-b-2 border-primary items-center cursor-default"
					:class="{ active: mobiker.id == currentIndex }"
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

			<div class="flex justify-center items-center bg-blue-500 h-96 col-span-2">
				<div>
					Graficas van aqui
					<div v-if="currentMobiker">
						{{ currentMobiker.fullName }}
						{{ currentMobiker.biciEnvios }}
						{{ currentMobiker.distrito.distrito }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import MobikerService from "@/services/mobiker.service";

export default {
	data() {
		return {
			mobikers: [],
			currentMobiker: null,
			currentIndex: -1,
			editModal: false,
			buscador: "",
		};
	},
	mounted() {
		this.retrieveMobikers();
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

		refreshList() {
			this.retrieveMobikers();

			this.currentMobiker = null;
			this.currentIndex = -1;
		},

		setActiveMobiker(mobiker, index) {
			this.currentMobiker = mobiker;
			this.currentIndex = index;
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

<style></style>
