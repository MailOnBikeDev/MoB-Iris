<template>
	<div class="w-full max-h-screen p-4 bg-gray-100 rounded-xl mt-10">
		<div class="flex justify-end">
			<h1
				class="inline-block text-2xl text-primary text-center font-bold mb-4 rounded-xl relative -top-12 py-2 bg-gray-100 px-6"
			>
				Tablero de Pedidos
			</h1>
		</div>

		<div class="flex flex-row justify-evenly -mt-10 mb-4">
			<div>
				<button
					class="bg-primary text-white px-4 py-2 rounded-xl focus:outline-none font-bold"
					@click="showBuscador = true"
				>
					Buscar cliente
				</button>
			</div>

			<BuscadorCliente
				:showBuscador="showBuscador"
				@cerrarBuscador="showBuscador = false"
				@activarCliente="activarCliente"
			/>

			<button
				class="bg-yellow-600 hover:bg-yellow-500 px-4 rounded-full focus:outline-none"
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
			<div
				class="col-start-2 col-span-3 inline-grid grid-cols-7 text-sm text-center font-bold items-center"
			>
				<div>
					<p># Pedido</p>
				</div>
				<div>
					<p>Origen</p>
				</div>
				<div>
					<p>Destino</p>
				</div>
				<div>
					<p>MoBiker</p>
				</div>
				<div>
					<p>Estado</p>
				</div>
				<div>
					<p>Fecha</p>
				</div>
				<div>
					<p>Editar</p>
				</div>
			</div>
			<div class="bg-white p-4 border-black border">
				<h2 class="text-3xl text-primary font-bold mb-4">
					Cliente
				</h2>

				<div class="flex flex-col text-sm h-80" v-if="currentPedido">
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

				<div class="flex flex-col text-sm h-80" v-else>
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

			<div class="bg-white col-span-3 overscroll-auto border-black border">
				<div
					class="grid grid-cols-7 gap-x-1 text-center text-sm py-2 border-b-2 border-primary hover:bg-info items-center"
					:class="{ 'bg-info': pedido.id == currentIndex }"
					v-for="pedido in pedidos"
					:key="pedido.id"
					@click="setActiveCliente(pedido, pedido.id)"
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
							class="bg-red-400 rounded-full inline px-2 py-1 font-bold text-white"
						>
							{{ pedido.status.tag }}
						</p>
					</div>
					<div>
						<p>{{ $date(pedido.fecha).format("DD/MM/YYYY") }}</p>
					</div>
					<div class="flex justify-center">
						<router-link
							:to="`/pedidos/tablero-pedidos/${pedido.id}`"
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
	</div>
</template>

<script>
import PedidoService from "@/services/pedido.service";
import BuscadorCliente from "@/components/BuscadorCliente";

export default {
	name: "Pedidos",
	components: { BuscadorCliente },
	data() {
		return {
			pedidos: [],
			showBuscador: false,
			currentPedido: null,
			currentIndex: -1,
		};
	},
	mounted() {
		this.retrievePedidos();
	},
	methods: {
		retrievePedidos() {
			PedidoService.getPedidos().then(
				(response) => {
					this.pedidos = response.data;
				},
				(error) => {
					this.pedidos =
						(error.response && error.response.data) ||
						error.message ||
						error.toString();
				}
			);
		},

		setActiveCliente(pedido, index) {
			this.currentPedido = pedido;
			this.currentIndex = index;
			// console.log("Pedido actual", this.currentPedido);
			// console.log("index:", this.currentIndex);
		},

		refreshList() {
			this.retrievePedidos();

			this.currentPedido = null;
			this.currentIndex = -1;
		},

		activarCliente(cliente) {
			console.log(cliente);
		},
	},
};
</script>
