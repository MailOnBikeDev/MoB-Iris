<template>
	<div class="w-full p-4">
		<h1 class="text-primary bg-white w-full font-bold text-2xl p-2">
			MoBikers
		</h1>

		<h2 class="text-white">{{ mobikers }}</h2>
	</div>
</template>

<script>
import SystemService from "@/services/system.service";

export default {
	data() {
		return {
			mobikers: [],
		};
	},
	mounted() {
		SystemService.getMobikers().then(
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
