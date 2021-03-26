<template>
	<div class="w-full max-h-screen p-4 bg-gray-100 rounded-xl mt-10">
		<div class="flex justify-end">
			<h1
				class="inline-block text-2xl text-primary text-center font-bold mb-4 rounded-xl relative -top-12 py-2 bg-gray-100 px-6"
			>
				Tablero de Pedidos
			</h1>
		</div>

		<ReporteComanda
			:showComanda="showComanda"
			@cerrarComanda="showComanda = false"
			:currentPedido="currentPedido"
		/>

		<DetallePedido
			:showDetalle="showDetalle"
			@cerrarDetalle="showDetalle = false"
			@emitirComanda="showComanda = true"
			:currentPedido="currentPedido"
		/>

		<div class="flex flex-row justify-evenly items-center -mt-10 mb-4">
			<div class="flex flex-row">
				<datepicker
					v-model="buscadorFecha"
					name="buscadorFecha"
					input-class="rounded-l-xl w-28 focus:outline-none p-2 font-bold cursor-pointer"
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

			<router-link
				to="/pedidos/pedidos-programados"
				class="bg-indigo-600 rounded-xl px-6 py-2 font-bold text-white focus:outline-none hover:bg-indigo-500"
				custom
				v-slot="{ navigate }"
			>
				<span @click="navigate" role="link" class="text-center cursor-pointer"
					>Asignar Pedidos</span
				>
			</router-link>

			<button
				class="bg-yellow-600 hover:bg-yellow-500 px-4 py-2 rounded-full focus:outline-none"
				@click="refreshList"
			>
				<font-awesome-icon class="text-white" icon="sync-alt" />
			</button>

			<router-link
				to="/pedidos/nuevo-pedido"
				class="bg-green-600 rounded-xl px-6 py-2 font-bold text-white focus:outline-none hover:bg-green-500"
				custom
				v-slot="{ navigate }"
			>
				<span @click="navigate" role="link" class="text-center cursor-pointer"
					>Crear nuevo Pedido</span
				>
			</router-link>
		</div>

		<div class="grid grid-cols-4 gap-2">
			<div class="flex flex-row justify-center">
				<p>
					<span class="resalta">N° de Pedidos del día:</span>
					{{ cantidadPedidos }}
				</p>
			</div>
			<div
				class="col-span-3 inline-grid grid-cols-7 text-sm text-center text-primary items-center"
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
					<p class="font-bold">Acciones</p>
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
					<p class="mb-2"><span class="resalta">Rol: </span>Remitente</p>
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
				class="bg-white col-span-3 max-h-96 overflow-y-auto border-black border pedidos-scroll"
			>
				<div
					class="grid grid-cols-7 gap-x-1 text-center text-sm h-14 py-2 border-b-2 border-primary hover:bg-info hover:text-white items-center cursor-pointer"
					:class="{ 'bg-info text-white font-bold': pedido.id == currentIndex }"
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
					<div class="flex justify-center items-center">
						<button class="focus:outline-none" @click="showComanda = true">
							<font-awesome-icon class="text-primary" icon="receipt" />
						</button>

						<button class="focus:outline-none" @click="showDetalle = true">
							<font-awesome-icon
								class="text-primary ml-6"
								icon="window-maximize"
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PedidoService from "@/services/pedido.service";
import ReporteComanda from "@/components/ReporteComanda";
import DetallePedido from "@/components/DetallePedido";
import Datepicker from "vuejs-datepicker";

export default {
	name: "Pedidos",
	components: {
		ReporteComanda,
		DetallePedido,
		Datepicker,
	},
	data() {
		return {
			pedidos: [],
			buscador: "",
			showComanda: false,
			showDetalle: false,
			currentPedido: null,
			currentIndex: -1,
			buscadorFecha: new Date(),

			page: 1,
			cantidadPedidos: 0,
			pageSize: 3,

			pageSizes: [3, 6, 9],
		};
	},
	mounted() {
		this.retrievePedidos();
	},
	methods: {
		getRequestParams(fecha, page, pageSize) {
			let params = {};

			if (fecha) {
				params["fecha"] = fecha;
			}

			if (page) {
				params["page"] = page - 1;
			}

			if (pageSize) {
				params["size"] = pageSize;
			}

			return params;
		},

		retrievePedidos() {
			const params = this.getRequestParams(
				this.$date(this.buscadorFecha).format("YYYY-MM-DD"),
				this.page,
				this.pageSize
			);

			PedidoService.getPedidosPorFecha(params).then(
				(response) => {
					const { pedidos, totalPedidos } = response.data;
					this.pedidos = pedidos;
					this.cantidadPedidos = totalPedidos;
				},
				(error) => {
					console.error(error);
				}
			);
		},

		setActivePedido(pedido, index) {
			this.currentPedido = pedido;
			this.currentIndex = index;
		},

		refreshList() {
			this.buscadorFecha = new Date();
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
