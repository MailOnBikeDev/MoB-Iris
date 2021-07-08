<template>
  <div class="flex justify-center mt-4 space-x-2 text-xl">
    <button
      class="px-2 rounded focus:outline-none text-primary hover:bg-info hover:text-white"
      @click="prevPageChange"
    >
      &#60;&#60;
    </button>
    <div class="text-primary" v-for="n in totalPages" :key="n">
      <button
        class="px-2 rounded focus:outline-none hover:bg-info hover:text-white"
        :class="{ 'bg-info text-white font-bold': n === page }"
        @click="handlePageChange(n)"
      >
        {{ n }}
      </button>
    </div>
    <button
      class="px-2 rounded focus:outline-none text-primary hover:bg-info hover:text-white"
      @click="nextPageChange"
    >
      &#62;&#62;
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    page: {
      type: Number,
      required: true,
    },
    cantidadItems: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalPages() {
      let total = Math.ceil(this.cantidadItems / this.pageSize);

      return total;
    },
  },
  methods: {
    prevPageChange() {
      if (this.page === 1) {
        console.log("No hagas nada");
        return;
      }
      this.$emit("prevPageChange");
    },

    nextPageChange() {
      if (this.page === this.totalPages) {
        console.log("No hagas nada");
        return;
      }
      this.$emit("nextPageChange");
    },

    handlePageChange(value) {
      this.$emit("handlePageChange", value);
    },
  },
};
</script>
