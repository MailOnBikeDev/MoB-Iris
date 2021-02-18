<template>
	<div class="w-full justify-center items-center">
		<div
			class="bg-gray-100 shadow-lg rounded-xl overflow-hidden mx-auto py-4 px-8 mt-6"
		>
			<div class="flex justify-end">
				<h1
					class="inline-block bg-primary text-white text-center font-bold px-4 py-2 rounded-xl"
				>
					Nuevo Pedido
				</h1>
			</div>

			<form class="mt-4">
				<div v-if="!successful" class="grid grid-cols-2 grid-flow-col gap-4">
					<div class="grid-cols-6 grid-flow-col">
						<h2>Cliente (Origen)</h2>

						<div class="grid-cols-6 grid-flow-col gap-4 mb-4">
							<label
								for="contacto"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>contacto</label
							>
							<input
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="contacto"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>empresa</label
							>
							<input
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="contacto"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>telefono</label
							>
							<input
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="contacto"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>direccion</label
							>
							<input
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="contacto"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>distrito</label
							>
							<input
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="ggrid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="contacto"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>otro Dato</label
							>
							<input
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="contacto"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>tipo de carga</label
							>
							<input
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-2 grid-flow-row gap-4 mb-4">
							<label
								for="contacto"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Tarifa</label
							>

							<label
								for="contacto"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Tarifa Sugerida</label
							>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="contacto"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>forma de pago</label
							>
							<input
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="contacto"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Rol</label
							>
							<input
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>
					</div>

					<div class="grid-cols-6">
						<h2>Cosignado (Destino)</h2>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="nombres"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Contacto</label
							>
							<input
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="nombres"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Empresa</label
							>
							<input
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="nombres"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>dirección</label
							>
							<input
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="nombres"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Distrito</label
							>
							<input
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="nombres"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Teléfono</label
							>
							<input
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="nombres"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Otro Dato</label
							>
							<input
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="nombres"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Mobiker</label
							>
							<input
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="nombres"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Comisión</label
							>
							<input
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="nombres"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Modalidad</label
							>
							<input
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {};
</script>
