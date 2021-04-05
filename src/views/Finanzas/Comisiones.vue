<template>
	<div class="w-full max-h-screen p-4 bg-gray-100 rounded-xl mt-10">
		<div class="flex justify-end">
			<h1
				class="inline-block text-2xl text-primary text-center font-bold mb-4 rounded-xl relative -top-12 py-2 bg-gray-100 px-6"
			>
				Comisiones de Pedidos
			</h1>
		</div>

		<ReporteComisiones
			:showDetalle="showDetalle"
			@cerrarDetalle="showDetalle = false"
			:detalles="pedidosMobiker"
			:mobiker="currentMobiker"
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
					@click="retrievePedidosMobikers"
				>
					Buscar
				</button>
			</div>

			<router-link
				to="/finanzas/historial-pedidos"
				class="bg-indigo-600 rounded-xl px-6 py-2 font-bold text-white focus:outline-none hover:bg-indigo-500"
				custom
				v-slot="{ navigate }"
			>
				<span @click="navigate" role="link" class="text-center cursor-pointer"
					>Volver al Historial</span
				>
			</router-link>

			<button
				class="bg-yellow-600 hover:bg-yellow-500 px-4 py-2 rounded-full focus:outline-none"
				@click="refreshList"
			>
				<font-awesome-icon class="text-white" icon="sync-alt" />
			</button>

			<button
				class="bg-green-600 rounded-xl px-6 py-2 font-bold text-white focus:outline-none hover:bg-green-500"
				@click="showDetalle = true"
			>
				Enviar reporte
			</button>
		</div>

		<div class="grid grid-cols-4 gap-2">
			<div class="flex flex-row justify-center">
				<p>
					<span class="resalta">Total de Pedidos:</span>
					{{ cantidadPedidos }}
				</p>
			</div>

			<div
				class="col-span-3 inline-grid grid-cols-6 text-sm text-center font-bold items-center text-primary"
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
				<button @click="sortPorEstado" class="focus:outline-none">
					<p class="font-bold">Estado</p>
				</button>
				<button @click="sortPorFecha" class="focus:outline-none">
					<p class="font-bold">Fecha</p>
				</button>
				<div>
					<p>Corregir</p>
				</div>
			</div>
			<div
				class="bg-white max-h-96 overflow-y-auto h-96 border-black border pedidos-scroll"
			>
				<div
					class="grid text-center text-sm h-14 px-2 border-b-2 border-primary hover:bg-info items-center"
					:class="{
						'bg-info text-white font-bold': mobiker.id == currentIndex,
					}"
					v-for="mobiker in mobikers"
					:key="mobiker.id"
					@click="setActiveMobiker(mobiker, mobiker.id)"
				>
					<div class="col-span-2">
						{{ mobiker.fullName }}
					</div>
				</div>
			</div>

			<div
				class="pedidos-scroll bg-white col-span-3 max-h-96 overflow-y-auto border-black border"
			>
				<div
					class="grid grid-cols-6 gap-x-1 text-center text-sm h-14 py-2 border-b-2 border-primary hover:bg-info items-center"
					v-for="pedido in pedidosMobiker"
					:key="pedido.id"
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
						<p
							v-if="
								pedido.status.id === 4 ||
									pedido.status.id === 5 ||
									pedido.status.id === 6
							"
							class="bg-green-700 rounded-full inline px-2 py-1 font-bold text-white"
						>
							{{ pedido.status.tag }}
						</p>
						<p
							v-if="
								pedido.status.id === 7 ||
									pedido.status.id === 8 ||
									pedido.status.id === 9 ||
									pedido.status.id === 10 ||
									pedido.status.id === 11 ||
									pedido.status.id === 12 ||
									pedido.status.id === 13 ||
									pedido.status.id === 14 ||
									pedido.status.id === 15 ||
									pedido.status.id === 16
							"
							class="bg-red-600 rounded-full inline px-2 py-1 font-bold text-white"
						>
							{{ pedido.status.tag }}
						</p>
						<p
							v-if="pedido.status.id === 19"
							class="bg-yellow-700 rounded-full inline px-2 py-1 font-bold text-white"
						>
							{{ pedido.status.tag }}
						</p>
					</div>

					<div>
						<p>{{ $date(pedido.fecha).format("DD MMM YYYY") }}</p>
					</div>

					<div class="flex justify-center">
						<router-link
							:to="`/finanzas/historial-pedidos/${pedido.id}`"
							custom
							v-slot="{ navigate }"
							class="cursor-pointer"
						>
							<font-awesome-icon
								class="text-primary"
								icon="pencil-alt"
								@click="navigate"
								role="link"
							/>
						</router-link>
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
import MobikerService from "@/services/mobiker.service";
import ReporteComisiones from "@/components/ReporteComisiones";
import Datepicker from "vuejs-datepicker";
import Pagination from "@/components/Pagination.vue";

export default {
	name: "Comisiones",
	components: { ReporteComisiones, Datepicker, Pagination },
	data() {
		return {
			mobikers: [],
			pedidosMobiker: [],
			showDetalle: false,
			currentMobiker: null,
			currentIndex: -1,
			fechaInicio: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
			fechaFin: new Date(),

			page: 1,
			cantidadPedidos: 0,
			pageSize: 10,
		};
	},
	mounted() {
		this.retrieveMobikers();
	},
	methods: {
		retrieveMobikers() {
			MobikerService.getMobikers().then(
				(response) => {
					this.mobikers = response.data
						.filter(
							(mobiker) =>
								mobiker.status === "Activo" &&
								mobiker.fullName !== "Asignar MoBiker"
						)
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

		getRequestParams(desde, hasta, id, page, pageSize) {
			let params = {};

			if (desde) {
				params["desde"] = desde;
			}

			if (hasta) {
				params["hasta"] = hasta;
			}

			if (id) {
				params["id"] = id;
			}

			if (page) {
				params["page"] = page - 1;
			}

			if (pageSize) {
				params["size"] = pageSize;
			}

			return params;
		},

		retrievePedidosMobikers() {
			const params = this.getRequestParams(
				this.$date(this.fechaInicio).format("YYYY-MM-DD"),
				this.$date(this.fechaFin).format("YYYY-MM-DD"),
				this.currentIndex,
				this.page,
				this.pageSize
			);

			MobikerService.getPedidosDelMobiker(params).then(
				(response) => {
					const { pedidos, totalPedidos } = response.data;
					this.pedidosMobiker = pedidos; // rows
					this.cantidadPedidos = totalPedidos; // count
				},
				(error) => {
					this.pedidosMobiker =
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

		setActiveMobiker(mobiker, index) {
			this.currentMobiker = mobiker;
			this.currentIndex = index;
			this.retrievePedidosMobikers();
		},

		refreshList() {
			this.retrievePedidos();

			this.currentMobiker = null;
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
