<template>
	<div class="w-full p-4">
		<h1 class="text-primary bg-white w-full font-bold text-2xl p-2">
			MoBikers
		</h1>

		<div class="grid grid-cols-1 bg-gray-200">
			<router-link to="/mobikers/nuevo-mobiker" custom v-slot="{ navigate }">
				<span @click="navigate" role="link" class="text-center cursor-pointer"
					>Crear nuevo mobiker</span
				>
			</router-link>
		</div>

		<div
			class="flex w-1/3 flex-row flex-wrap my-4 bg-white p-8"
			v-for="mobiker in mobikers"
			:key="mobiker.id"
		>
			<div class="block">
				<p>
					<span class="resalta">ID: </span>
					<span>{{ mobiker.id }}</span>
				</p>

				<p>
					<span class="resalta">Nombres: </span>
					<span>{{ mobiker.nombres }} </span>{{ mobiker.apellidos }}
				</p>
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
		};
	},
	mounted() {
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
};
</script>

<style></style>
