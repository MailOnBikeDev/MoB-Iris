<template>
	<div class="w-full max-h-screen p-4 bg-gray-100 rounded-xl mt-10">
		<div class="flex justify-end">
			<h1
				class="inline-block text-2xl text-primary text-center font-bold mb-4 rounded-xl relative -top-12 py-2 bg-gray-100 px-6"
			>
				Historial de Pedidos
			</h1>
		</div>

		<DetalleHistorialPedido
			:showDetalle="showDetalle"
			@cerrarDetalle="showDetalle = false"
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

			<div>
				<input
					type="text"
					placeholder="Buscar Pedido..."
					class="rounded w-48 text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 py-1 px-2"
					v-model="buscador"
					@keyup="buscarPedido"
				/>
			</div>

			<button
				class="bg-yellow-600 hover:bg-yellow-500 px-4 py-2 rounded-full focus:outline-none"
				@click="refreshList"
			>
				<font-awesome-icon class="text-white" icon="sync-alt" />
			</button>

			<router-link
				to="/finanzas/comisiones"
				class="bg-indigo-600 rounded-xl px-6 py-2 font-bold text-white focus:outline-none hover:bg-indigo-500"
				custom
				v-slot="{ navigate }"
			>
				<span @click="navigate" role="link" class="text-center cursor-pointer"
					>Comisiones</span
				>
			</router-link>
		</div>

		<div class="grid grid-cols-4 gap-2">
			<div class="flex flex-row justify-center">
				<p>
					<span class="resalta">Número de Pedidos:</span> {{ cantidadPedidos }}
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
					<p>Reporte</p>
				</div>
			</div>

			<div class="bg-white p-4 border-black border">
				<h2 class="text-3xl text-primary font-bold mb-4">
					Cliente
				</h2>

				<div class="flex flex-col max-h-96 text-sm" v-if="currentPedido">
					<p class="mb-2">
						<span class="resalta">Contacto: </span>
						{{ currentPedido.contactoRemitente }}
					</p>
					<p class="mb-2">
						<span class="resalta">Empresa: </span
						>{{ currentPedido.empresaRemitente }}
					</p>
					<p class="mb-2">
						<span class="resalta">Dirección: </span
						>{{ currentPedido.direccionRemitente }}
					</p>
					<p class="mb-2">
						<span class="resalta">Distrito: </span
						>{{ currentPedido.distritoRemitente }}
					</p>
					<p class="mb-2">
						<span class="resalta">Teléfono: </span
						>{{ currentPedido.telefonoRemitente }}
					</p>
					<p class="mb-2">
						<span class="resalta">Otro dato: </span
						>{{ currentPedido.otroDatoRemitente }}
					</p>
					<p class="mb-2">
						<span class="resalta">Forma de Pago: </span
						>{{ currentPedido.formaPago }}
					</p>
					<p class="mb-2">
						<span class="resalta">Tarifa: </span>S/.
						{{ currentPedido.tarifa }}
					</p>
					<p class="mb-2">
						<span class="resalta">Modalidad: </span
						>{{ currentPedido.modalidad.tipo }}
					</p>
					<p class="mb-2">
						<span class="resalta">Rol: </span>{{ currentPedido.rolCliente }}
					</p>
				</div>

				<div class="flex flex-col max-h-96 text-sm" v-else>
					<p class="mb-2">
						<span class="resalta">Contacto: </span>
					</p>
					<p class="mb-2">
						<span class="resalta">Empresa: </span>
					</p>
					<p class="mb-2">
						<span class="resalta">Dirección: </span>
					</p>
					<p class="mb-2"><span class="resalta">Distrito: </span></p>
					<p class="mb-2"><span class="resalta">Teléfono: </span></p>
					<p class="mb-2">
						<span class="resalta">Otro dato: </span>
					</p>
					<p class="mb-2">
						<span class="resalta">Forma de Pago: </span>
					</p>
					<p class="mb-2"><span class="resalta">Tarifa: </span>S/.</p>
					<p class="mb-2"><span class="resalta">Modalidad: </span></p>
					<p class="mb-2"><span class="resalta">Rol: </span></p>
				</div>
			</div>

			<div
				class="pedidos-scroll bg-white col-span-3 max-h-96 overflow-y-auto border-black border"
			>
				<div
					class="grid grid-cols-7 gap-x-1 text-center text-sm h-14 py-2 border-b-2 border-primary hover:bg-info items-center cursor-pointer"
					:class="{ 'bg-info text-white font-bold': pedido.id == currentIndex }"
					v-for="pedido in pedidos"
					:key="pedido.id"
					@click="setActiveCliente(pedido, pedido.id)"
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
						<p
							v-if="pedido.status.id === 3"
							class="bg-indigo-400 rounded-full inline px-2 py-1 font-bold text-white"
						>
							{{ pedido.status.tag }}
						</p>
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
							v-if="
								pedido.status.id === 17 ||
									pedido.status.id === 18 ||
									pedido.status.id === 19
							"
							class="bg-yellow-700 rounded-full inline px-2 py-1 font-bold text-white"
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
import PedidoService from "@/services/pedido.service";
import DetalleHistorialPedido from "@/components/DetalleHistorialPedido";
import Datepicker from "vuejs-datepicker";
import Pagination from "@/components/Pagination.vue";

export default {
	name: "HistorialPedidos",
	components: { DetalleHistorialPedido, Datepicker, Pagination },
	data() {
		return {
			mobikers: [],
			pedidos: [],
			showDetalle: false,
			currentPedido: null,
			currentIndex: -1,
			fechaInicio: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 6),
			fechaFin: new Date(),
			buscador: "",

			page: 1,
			cantidadPedidos: 0,
			pageSize: 50,
		};
	},
	mounted() {
		this.retrievePedidos();
		this.retrieveMobikers();
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

		buscarPedido() {
			console.log(typeof this.buscador);
			const textoCliente = this.buscador.toLowerCase();
			this.pedidos = this.pedidos.filter((pedido) => {
				const compararTexto = pedido.contactoRemitente.toLowerCase();
				const compararId = pedido.id.toString();
				if (
					compararTexto.includes(textoCliente) ||
					compararId.includes(textoCliente)
				) {
					return pedido;
				}
			});

			if (textoCliente.trim() === "") {
				this.refreshList();
			}
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
					this.pedidos = pedidos; // rows
					this.cantidadPedidos = totalPedidos; // count
				},
				(error) => {
					this.pedidos =
						(error.response && error.response.data) ||
						error.message ||
						error.toString();
				}
			);
		},

		retrieveMobikers() {
			MobikerService.getMobikers().then(
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

		handlePageChange(value) {
			this.page = value;
			this.retrievePedidos();
		},

		setActiveCliente(pedido, index) {
			this.currentPedido = pedido;
			this.currentIndex = index;
		},

		refreshList() {
			this.fechaInicio = new Date(
				new Date().getTime() - 1000 * 60 * 60 * 24 * 7
			);
			this.fechaFin = new Date();
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
