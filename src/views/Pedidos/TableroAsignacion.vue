<template>
	<div class="w-full max-h-screen p-4 bg-gray-100 rounded-xl mt-10">
		<div class="flex justify-end">
			<h1
				class="inline-block text-2xl text-primary text-center font-bold mb-4 rounded-xl relative -top-12 py-2 bg-gray-100 px-6"
			>
				Asignación de Pedidos
			</h1>
		</div>

		<DetallePedidoProgramado
			:showDetalle="showDetalle"
			@cerrarDetalle="showDetalle = false"
			:currentPedido="currentPedido"
		/>

		<div class="flex flex-row justify-evenly -mt-10 mb-4">
			<button
				class="bg-yellow-600 hover:bg-yellow-500 px-4 rounded-full focus:outline-none"
				@click="refreshList"
			>
				<font-awesome-icon class="text-white" icon="sync-alt" />
			</button>

			<router-link
				to="/pedidos/tablero-pedidos"
				class="bg-indigo-600 rounded-xl px-6 py-2 font-bold text-white focus:outline-none hover:bg-indigo-500"
				custom
				v-slot="{ navigate }"
			>
				<span @click="navigate" role="link" class="text-center cursor-pointer"
					>Regresar al Tablero</span
				>
			</router-link>
		</div>

		<div class="grid grid-cols-4 gap-2">
			<div class="flex flex-row justify-center">
				<p v-if="pedidos">
					<span class="resalta">Pedidos por asignar:</span>
					{{ pedidos.length }}
				</p>
			</div>

			<div
				class="col-span-3 inline-grid grid-cols-7 text-sm text-center font-bold items-center text-primary"
			>
				<button @click="sortPorId" class="focus:outline-none">
					<p class="font-bold"># Pedido</p>
				</button>
				<button @click="sortPorOrigen" class="focus:outline-none">
					<p class="font-bold">Origen</p>
				</button>
				<button @click="sortPorDestino" class="focus:outline-none">
					<p class="font-bold">Destino</p>
				</button>
				<button @click="sortPorMobiker" class="focus:outline-none">
					<p class="font-bold">MoBiker</p>
				</button>
				<button @click="sortPorEstado" class="focus:outline-none">
					<p class="font-bold">Estado</p>
				</button>
				<button @click="sortPorFecha" class="focus:outline-none">
					<p class="font-bold">Fecha</p>
				</button>
				<div>
					<p>Asignar</p>
				</div>
			</div>
			<div
				class="bg-white max-h-96 overflow-y-auto h-96 border-black border pedidos-scroll"
			>
				<div
					class="grid grid-cols-3 gap-x-1 text-center text-sm h-14 px-2 border-b-2 border-primary hover:bg-info items-center"
					v-for="mobiker in mobikers"
					:key="mobiker.id"
				>
					<div class="col-span-2">
						{{ mobiker.fullName }}
					</div>

					<div>
						{{ mobiker.biciEnvios }}
					</div>
				</div>
			</div>

			<div
				class="pedidos-scroll bg-white col-span-3 max-h-96 overflow-y-auto border-black border"
			>
				<div
					class="grid grid-cols-7 gap-x-1 text-center text-sm h-14 py-2 border-b-2 border-primary hover:bg-info items-center"
					:class="{
						'bg-info text-white font-bold': pedido.id == currentIndex,
					}"
					v-for="pedido in pedidos"
					:key="pedido.id"
					@click="setActivePedido(pedido, pedido.id)"
				>
					<div>
						<p>{{ pedido.id }}</p>
					</div>
					<div>
						<p>{{ pedido.distritoRemitente }}</p>
					</div>
					<div>
						<p>{{ pedido.distrito.distrito }}</p>
					</div>
					<div>
						<p>{{ pedido.mobiker.fullName }}</p>
					</div>
					<div>
						<p
							v-if="pedido.status.id === 1"
							class="bg-purple-400 rounded-full inline px-2 py-1 font-bold text-white"
						>
							{{ pedido.status.tag }}
						</p>
					</div>
					<div>
						<p>{{ $date(pedido.fecha).format("DD MMM YYYY") }}</p>
					</div>
					<div class="flex justify-center">
						<button class="focus:outline-none" @click="showDetalle = true">
							<font-awesome-icon class="text-primary" icon="window-maximize" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PedidoService from "@/services/pedido.service";
import MobikerService from "@/services/mobiker.service";
import DetallePedidoProgramado from "@/components/DetallePedidoProgramado.vue";

export default {
	name: "Pedidos",
	components: { DetallePedidoProgramado },
	data() {
		return {
			mobikers: [],
			pedidos: [],
			showDetalle: false,
			currentPedido: null,
			currentIndex: -1,
		};
	},
	mounted() {
		this.retrieveMobikers();
		this.retrievePedidos();
	},
	methods: {
		retrieveMobikers() {
			MobikerService.getMobikers().then(
				(response) => {
					this.mobikers = response.data
						.filter((mobiker) => mobiker.status === "Activo")
						.sort((a, b) => {
							return a.biciEnvios > b.biciEnvios ? 1 : -1;
						});
				},
				(error) => {
					this.mobikers =
						(error.response && error.response.data) ||
						error.message ||
						error.toString();
				}
			);
		},

		retrievePedidos() {
			PedidoService.getPedidos().then(
				(response) => {
					this.pedidos = response.data.filter(
						(pedido) => pedido.statusId === 1
					);
				},
				(error) => {
					this.pedidos =
						(error.response && error.response.data) ||
						error.message ||
						error.toString();
				}
			);
		},

		setActivePedido(pedido, index) {
			this.currentPedido = pedido;
			this.currentIndex = index;
		},

		refreshList() {
			this.retrievePedidos();

			this.currentPedido = null;
			this.currentIndex = -1;
		},

		sortPorId() {
			this.pedidos.sort((a, b) => {
				return a.id > b.id ? 1 : -1;
			});
		},

		sortPorOrigen() {
			this.pedidos.sort((a, b) => {
				return a.distritoRemitente.toLowerCase() >
					b.distritoRemitente.toLowerCase()
					? 1
					: -1;
			});
		},

		sortPorDestino() {
			this.pedidos.sort((a, b) => {
				return a.distrito.distrito.toLowerCase() >
					b.distrito.distrito.toLowerCase()
					? 1
					: -1;
			});
		},

		sortPorMobiker() {
			this.pedidos.sort((a, b) => {
				return a.mobiker.fullName.toLowerCase() >
					b.mobiker.fullName.toLowerCase()
					? 1
					: -1;
			});
		},

		sortPorEstado() {
			this.pedidos.sort((a, b) => {
				return a.status.tag.toLowerCase() > b.status.tag.toLowerCase() ? 1 : -1;
			});
		},

		sortPorFecha() {
			this.pedidos.sort((a, b) => {
				return a.fecha > b.fecha ? -1 : 1;
			});
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
