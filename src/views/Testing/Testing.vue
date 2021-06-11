<template>
  <div class="w-full max-h-screen p-4 mt-10 bg-gray-100 rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Testing
      </h1>
    </div>
			<h2>Prueba CSV</h2>
			<input type="file" @change="onFileChanged" multiple>
			<button @click="uploadFile">Enviar</button>
	</div>
</template>

<script>
import TestingService from "@/services/testing.service";

export default {
	data() {
		return {
			file: null
		}
	},
	methods: {
		onFileChanged (event) {
			this.file = event.target.files[0];
		},
		async uploadFile() {
      try {
				const mypostparameters = new FormData();
				mypostparameters.append('file', this.file, this.file.name);
				//axios.post('/uploadmyfile', mypostparameters);				

				for (var key of mypostparameters.entries()) {
					console.log(key[0] + ', ' + key[1]);
				}
        		let response = await TestingService.testFile(mypostparameters);
				console.log("Mi respuesta en Iris");
				console.log(response)
			}catch(error){
				console.log(error)
			}
		}
	}
}
</script>
    