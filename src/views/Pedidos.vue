<template>
	<div>
		<h1 class="text-white">Pedidos</h1>

		<h2 class="text-white">{{ content }}</h2>
	</div>
</template>

<script>
import SystemService from "@/services/system.service";

export default {
	name: "Pedidos",
	data() {
		return {
			content: [],
		};
	},
	mounted() {
		SystemService.getPedidos().then(
			(response) => {
				this.content = response.data;
			},
			(error) => {
				this.content =
					(error.response && error.response.data) ||
					error.message ||
					error.toString();
			}
		);
	},
};
</script>

<style></style>
