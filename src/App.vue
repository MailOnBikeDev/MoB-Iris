<template>
  <div id="app">
    <header>
      <Navigation />
    </header>

    <main class="container justify-center mx-auto cols-md-12">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  name: "App",
  components: { Navigation },
  async mounted() {
    try {
      if (this.$store.state.user !== null) {
        await this.getAllTablasAuxiliares();
        await this.getMoBikersAndClientes();
      }
    } catch (error) {
      console.error(
        `Error al iniciar la app. Las tablas no pudieron ser cargadas: ${error.message}`
      );
    }
  },
  methods: {
    async getAllTablasAuxiliares() {
      try {
        await this.$store.dispatch("auxiliares/getRolesUsuarios");
        await this.$store.dispatch("auxiliares/getDistritosLima");
        await this.$store.dispatch("auxiliares/getTiposCarga");
        await this.$store.dispatch("auxiliares/getComprobantes");
        await this.$store.dispatch("auxiliares/getTiposEnvios");
        await this.$store.dispatch("auxiliares/getFormasPago");
        await this.$store.dispatch("auxiliares/getModalidades");
        await this.$store.dispatch("auxiliares/getRangosMoB");
        await this.$store.dispatch("auxiliares/getRolCliente");
        await this.$store.dispatch("auxiliares/getEntidadesBancarias");
        await this.$store.dispatch("auxiliares/getStatusPedido");
        console.log("Se cargaron las tablas auxiliares");
      } catch (error) {
        console.error(
          `No se pudieron cargar las tablas Auxiliares. ${error.message}`
        );
      }
    },

    async getMoBikersAndClientes() {
      try {
        await this.$store.dispatch("mobikers/getMobikers");
        await this.$store.dispatch("clientes/getClientes");
        await this.$store.dispatch("destinos/getDestinos");
        console.log("Se cargaron los MoBikers y los Clientes");
      } catch (error) {
        console.error(
          `No se pudieron cargar los MoBikers y Clientes. ${error.message}`
        );
      }
    },
  },
};
</script>
