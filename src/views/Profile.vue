<template>
  <div class="w-1/2 p-4 mx-auto my-12 bg-gray-100 shadow-lg rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Perfil
      </h1>
    </div>

    <div class="-mt-12">
      <div class="p-4">
        <h2 class="mb-2">
          <strong class="resalta">Perfil:</strong>
          {{ currentUser.username }}
        </h2>
        <p class="mb-2">
          <strong class="resalta">Nombre:</strong>
          {{ currentUser.fullName }}
        </p>
        <p class="mb-2">
          <strong class="resalta">Email:</strong>
          {{ currentUser.email }}
        </p>
        <p class="mb-2">
          <strong class="resalta">Empresa:</strong>
          {{ currentUser.empresa }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Perfil",
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
