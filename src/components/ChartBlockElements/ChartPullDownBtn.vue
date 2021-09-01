<template>
    <button
        @click="$emit('chart-pull-down')"
        type="button"
        class="btn-chart-position-control"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chevron-compact-down"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
          />
        </svg>
      </button>
</template>

<style lang="scss" scoped>
.bi-chevron-compact-down {
  transform: scale(2.5, 1.5);
  color: white;
}

.btn-chart-position-control {
  width: calc(100% + 20px);
  background-color: $theme1-color4;
  border: 0px;
  color: white;
}
</style>

<script>
export default {
    name: "ChartPullDownBtn",
    emit: ["chart-pull-down"],
}
</script>
