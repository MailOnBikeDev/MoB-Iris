<template>
	<div class="flex justify-center space-x-2 mt-4 text-xl">
		<button
			class="px-2 focus:outline-none rounded hover:bg-info"
			@click="prevPageChange"
		>
			-
		</button>
		<div v-for="n in totalPages" :key="n">
			<button
				class="px-2 focus:outline-none rounded hover:bg-info"
				:class="{ 'bg-info text-white font-bold': n === page }"
				@click="handlePageChange(n)"
			>
				{{ n }}
			</button>
		</div>
		<button
			class="px-2 focus:outline-none rounded hover:bg-info"
			@click="nextPageChange"
		>
			+
		</button>
	</div>
</template>

<script>
export default {
	name: "Pagination",
	props: {
		page: {
			type: Number,
			required: true,
		},
		cantidadItems: {
			type: Number,
			required: true,
		},
		pageSize: {
			type: Number,
			required: true,
		},
	},
	computed: {
		totalPages() {
			let total = Math.ceil(this.cantidadItems / this.pageSize);

			return total;
		},
	},
	methods: {
		prevPageChange() {
			if (this.page === 1) {
				console.log("No hagas nada");
				return;
			}
			this.$emit("prevPageChange");
		},

		nextPageChange() {
			if (this.page === this.totalPages) {
				console.log("No hagas nada");
				return;
			}
			this.$emit("nextPageChange");
		},

		handlePageChange(value) {
			this.$emit("handlePageChange", value);
		},
	},
};
</script>
