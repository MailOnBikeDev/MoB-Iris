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
};
</script>
