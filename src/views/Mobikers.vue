<template>
	<div>
		<h1 class="text-white">MoBikers</h1>

		<h2 class="text-white">{{ content }}</h2>
	</div>
</template>

<script>
import SystemService from "@/services/system.service";

export default {
	data() {
		return {
			content: [],
		};
	},
	mounted() {
		SystemService.getMobikers().then(
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
