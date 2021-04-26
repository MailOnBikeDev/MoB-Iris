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
			@refresh="refreshList"
			:currentPedido="currentPedido"
		/>

		<div class="flex flex-row justify-evenly -mt-10 mb-4">
			<div class="flex flex-row">
				<datepicker
					v-model="fechaInicio"
					name="fechaInicio"
					input-class="rounded-l-xl w-32 focus:outline-none p-2 font-bold cursor-pointer"
					:monday-first="true"
				/>
				<datepicker
					v-model="fechaFin"
					name="fechaFin"
					input-class="w-32 focus:outline-none p-2 font-bold cursor-pointer"
					:monday-first="true"
				/>
				<button
					type="button"
					class="bg-white py-1 px-2 rounded-r-xl font-bold hover:bg-info hover:text-white focus:outline-none"
					@click="retrievePedidos"
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
					{{ pedidosPorAsignar }}
				</p>
			</div>

			<div
				class="col-span-3 inline-grid grid-cols-8 text-sm text-center font-bold items-center text-primary"
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
				<div>
					<p>Observaciones</p>
				</div>
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
						{{
							pedidosMobiker.filter(
								(pedido) =>
									pedido.mobikerId === mobiker.id &&
									pedido.statusId !== (17 || 18 || 19)
							).length
						}}
					</div>
				</div>
			</div>

			<div
				class="pedidos-scroll bg-white col-span-3 max-h-96 overflow-y-auto border-black border"
			>
				<div
					class="grid grid-cols-8 gap-x-1 text-center text-sm h-14 py-2 border-b-2 border-primary hover:bg-info items-center"
					:class="{
						'bg-info text-white font-bold': pedido.id == currentIndex,
					}"
					v-for="pedido in pedidos"
					:key="pedido.id"
					@click="setActivePedido(pedido, pedido.id)"
					:title="
						`Cliente: ${pedido.contactoRemitente}. Observaciones: ${pedido.otroDatoRemitente} / ${pedido.otroDatoConsignado}`
					"
				>
					<div>
						<p>{{ pedido.id }}</p>
					</div>
					<div>
						<p v-if="pedido.rolCliente === 'Remitente'">
							{{ pedido.distritoRemitente }}
						</p>
						<p v-else>{{ pedido.distrito.distrito }}</p>
					</div>
					<div>
						<p v-if="pedido.rolCliente === 'Remitente'">
							{{ pedido.distrito.distrito }}
						</p>
						<p v-else>{{ pedido.distritoRemitente }}</p>
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
						<p
							v-if="pedido.status.id === 2"
							class="bg-yellow-400 rounded-full inline px-2 py-1 font-bold text-white"
						>
							{{ pedido.status.tag }}
						</p>
					</div>
					<div>
						<p
							v-if="pedido.otroDatoConsignado"
							class="text-red-500 font-bold text-2xl"
						>
							!
						</p>
						<p v-else></p>
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

		<Pagination
			:page="page"
			:cantidadItems="cantidadPedidos"
			:pageSize="pageSize"
			@prevPageChange="
				page--;
				retrievePedidos();
			"
			@nextPageChange="
				page++;
				retrievePedidos();
			"
			@handlePageChange="handlePageChange"
		/>
	</div>
</template>

<script>
import PedidoService from "@/services/pedido.service";
import MobikerService from "@/services/mobiker.service";
import DetallePedidoProgramado from "@/components/DetallePedidoProgramado.vue";
import Datepicker from "vuejs-datepicker";
import Pagination from "@/components/Pagination.vue";

export default {
	name: "Pedidos",
	components: { DetallePedidoProgramado, Datepicker, Pagination },
	data() {
		return {
			mobikers: [],
			pedidos: [],
			pedidosMobiker: [],
			showDetalle: false,
			currentPedido: null,
			currentIndex: -1,
			fechaInicio: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 6),
			fechaFin: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
			pedidosPorAsignar: 0,

			page: 1,
			cantidadPedidos: 0,
			pageSize: 50,
		};
	},
	mounted() {
		this.retrieveMobikers();
		this.retrievePedidos();
	},
	methods: {
		getRequestParams(desde, hasta, page, pageSize) {
			let params = {};

			if (desde) {
				params["desde"] = desde;
			}

			if (hasta) {
				params["hasta"] = hasta;
			}

			if (page) {
				params["page"] = page - 1;
			}

			if (pageSize) {
				params["size"] = pageSize;
			}

			return params;
		},

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
			const params = this.getRequestParams(
				this.$date(this.fechaInicio).format("YYYY-MM-DD"),
				this.$date(this.fechaFin).format("YYYY-MM-DD"),
				this.page,
				this.pageSize
			);

			PedidoService.historialPedidos(params).then(
				(response) => {
					const { pedidos, totalPedidos } = response.data;
					this.pedidos = pedidos
						.filter((pedido) => pedido.statusId === 1 || pedido.statusId === 2)
						.sort((a, b) => {
							return a.statusId > b.statusId ? 1 : -1;
						}); // rows
					this.pedidosMobiker = pedidos;
					this.cantidadPedidos = totalPedidos; // count
					this.pedidosPorAsignar = pedidos.filter(
						(pedido) =>
							pedido.statusId === 1 &&
							pedido.mobiker.fullName === "Asignar MoBiker"
					).length;
				},
				(error) => {
					this.pedidos =
						(error.response && error.response.data) ||
						error.message ||
						error.toString();
				}
			);
		},

		handlePageChange(value) {
			this.page = value;
			this.retrievePedidos();
		},

		setActivePedido(pedido, index) {
			this.currentPedido = pedido;
			this.currentIndex = index;
		},

		refreshList() {
			this.fechaInicio = new Date(
				new Date().getTime() - 1000 * 60 * 60 * 24 * 6
			);
			this.fechaFin = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
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
