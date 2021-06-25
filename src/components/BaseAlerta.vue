<template>
  <transition name="alerta" appear>
    <div
      class="fixed right-0 p-6 font-bold text-white rounded-l-lg top-1/4"
      :class="[alert.success ? 'bg-green-500' : 'bg-red-500']"
    >
      {{ alert.message }}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    alert: Object,
  },
};
</script>

<style lang="scss">
.alerta-enter,
.alerta-leave-to {
  opacity: 0;
  transform: translateX(200px);
}

.alerta-enter-active,
.alerta-leave-active {
  transition: all 0.5s ease;
}
</style>
