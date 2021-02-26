<template>
	<div class="w-full max-h-screen py-4 px-2 bg-white mt-6 bg-opacity-30">
		<div class="flex justify-end">
			<h1
				class="inline-block bg-primary text-white text-center font-bold px-4 py-2 rounded-xl relative -top-8"
			>
				Tablero de Pedidos
			</h1>
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
			<div class="bg-white p-4">
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

			<div class="bg-white col-span-3 overscroll-auto">
				<div
					class="grid grid-cols-7 gap-x-1 text-center text-sm py-1 border-b-2 border-primary hover:bg-info items-center"
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
						<p class="bg-red-400 rounded inline px-4 py-1 font-bold text-white">
							{{ pedido.status.codigo }}
						</p>
					</div>
					<div>
						<p>{{ $date(pedido.fecha).format("DD/MM/YYYY") }}</p>
					</div>
					<div>
						<font-awesome-icon icon="pencil-alt" />
					</div>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 bg-gray-200">
			<router-link to="/pedidos/nuevo-pedido" custom v-slot="{ navigate }">
				<span @click="navigate" role="link" class="text-center cursor-pointer"
					>Crear nuevo pedido</span
				>
			</router-link>
		</div>
	</div>
</template>

<script>
import PedidoService from "@/services/pedido.service";

export default {
	name: "Pedidos",
	data() {
		return {
			pedidos: [],
			currentPedido: null,
			currentIndex: -1,
		};
	},
	mounted() {
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
	methods: {
		setActiveCliente(pedido, index) {
			this.currentPedido = pedido;
			this.currentIndex = index;
			console.log("Pedido actual", this.currentPedido);
		},
	},
};
</script>

<style></style>
