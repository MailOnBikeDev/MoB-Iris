<template>
  <div class="flex flex-col items-center justify-center w-full mt-28">
    <div
      class="flex flex-col justify-center max-w-lg px-8 py-4 mx-auto bg-gray-100 shadow-lg rounded-xl"
    >
      <img
        id="profile-img"
        src="@/assets/MoB-logo.png"
        alt="Mail On Bike Logo"
        class="relative w-40 mx-auto -top-24"
      />

      <h2 class="mb-10 -mt-16 text-2xl font-bold text-center text-primary">
        Bienvenidos a Mail On Bike
      </h2>

      <router-link
        to="/login"
        class="px-4 py-2 my-4 font-bold text-center text-white rounded-lg bg-secondary link"
        custom
        v-slot="{ navigate }"
      >
        <span @click="navigate" role="link">
          Empezar
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang="scss" scoped>
.link {
  cursor: pointer;
}
</style>
