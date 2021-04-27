vue.<template>
	<div
		v-if="showBuscador == true"
		class="bg-primary w-1/2 h-96 absolute top-1/3 left-1/4 z-40 p-8 rounded-xl shadow-xl"
	>
		<div class="absolute -top-4 -right-2">
			<button
				class="rounded-full bg-info hover:bg-secondary px-2 text-2xl focus:outline-none text-white"
				@click.prevent="cerrarBuscador"
			>
				<font-awesome-icon icon="times" />
			</button>
		</div>

		<div class="flex flex-row justify-center">
			<input
				type="text"
				class="rounded text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-1"
				placeholder="Buscar cliente..."
				v-model="buscador"
				v-on:keyup.enter="searchCliente"
			/>

			<button
				type="button"
				class="bg-white ml-2 py-1 px-2 rounded font-bold hover:bg-info hover:text-white focus:outline-none"
				@click="searchCliente"
			>
				Buscar
			</button>
		</div>

		<div class="overscroll-auto h-56 mt-6">
			<div
				class="grid grid-cols-3 bg-white text-center text-sm py-2 hover:bg-info border-b-2 border-primary items-center cursor-default"
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
				class="bg-secondary text-white font-bold px-4 py-2 rounded-xl focus:outline-none hover:bg-info"
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
