vue.<template>
	<div
		v-if="showBuscador == true"
		class="absolute z-40 w-1/2 p-8 py-10 shadow-xl bg-primary top-1/4 left-1/4 rounded-xl"
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
				type="search"
				class="input"
				v-model="buscador"
				@keyup="searchCliente"
				placeholder="Buscar contacto o empresa..."
			/>
		</div>

		<div class="h-56 mt-6 overflow-y-auto">
			<div
				class="grid items-center grid-cols-3 py-2 text-sm text-center bg-white border-b-2 cursor-default hover:bg-info border-primary"
				:class="{ 'bg-info': cliente.id == currentIndex }"
				v-for="cliente in clientesFiltrados"
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
import { mapState, mapActions } from "vuex";

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
			currentCliente: null,
			currentIndex: -1,
		};
	},
	mounted() {
		this.clientesFiltrados = this.clientes;
	},
	computed: {
		...mapState("clientes", ["clientes"]),
	},
	methods: {
		...mapActions("clientes", ["buscarCliente"]),

		async searchCliente() {
			try {
				this.clientesFiltrados = await this.buscarCliente(this.buscador);

				if (this.buscador.trim() === "") {
					this.clientesFiltrados = this.clientes;
				}
			} catch (error) {
				console.error(`Error en el buscador de Clientes: ${error.message}`);
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
};
</script>
