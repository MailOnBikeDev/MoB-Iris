vue.<template>
	<div
		v-if="showBuscador == true"
		class="absolute z-40 w-1/2 p-8 shadow-xl bg-primary h-96 top-1/3 left-1/4 rounded-xl"
	>
		<div class="absolute -top-4 -right-2">
			<button
				class="px-2 text-2xl text-white rounded-full bg-info hover:bg-secondary focus:outline-none"
				@click.prevent="cerrarBuscador"
			>
				<font-awesome-icon icon="times" />
			</button>
		</div>

		<div class="flex flex-row justify-center">
			<input
				type="text"
				class="p-1 text-gray-700 transition duration-500 border-b-4 rounded focus:outline-none focus:border-info"
				placeholder="Buscar cliente..."
				v-model="buscador"
				v-on:keyup.enter="searchCliente"
			/>

			<button
				type="button"
				class="px-2 py-1 ml-2 font-bold bg-white rounded hover:bg-info hover:text-white focus:outline-none"
				@click="searchCliente"
			>
				Buscar
			</button>
		</div>

		<div class="h-56 mt-6 overflow-y-auto">
			<div
				class="grid items-center grid-cols-3 py-2 text-sm text-center bg-white border-b-2 cursor-default hover:bg-info border-primary"
				:class="{ 'bg-info': cliente.id == currentIndex }"
				v-for="cliente in listadoClientes"
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
			</div>
		</div>

		<div class="flex justify-center mt-4">
			<button
				class="px-4 py-2 font-bold text-white bg-secondary rounded-xl focus:outline-none hover:bg-info"
				@click.prevent="enviarCliente"
			>
				Capturar cliente
			</button>
		</div>
	</div>
</template>

<script>
import ClienteService from "@/services/cliente.service";

export default {
	name: "BuscadorCliente",
	props: {
		showBuscador: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			buscador: "",
			listadoClientes: [],
			currentCliente: null,
			currentIndex: -1,
		};
	},
	methods: {
		async searchCliente() {
			try {
				let findCliente = await ClienteService.searchCliente(this.buscador);

				this.listadoClientes = findCliente.data;
				this.buscador = "";
			} catch (error) {
				console.error(error);
			}
		},

		setActiveCliente(cliente, index) {
			this.currentCliente = cliente;
			this.currentIndex = index;
		},

		cerrarBuscador() {
			this.$emit("cerrarBuscador");
		},

		enviarCliente() {
			this.$emit("activarCliente", this.currentCliente);
			this.$emit("cerrarBuscador");
		},
	},
	mounted() {
		this.enviarCliente();
	},
};
</script>
