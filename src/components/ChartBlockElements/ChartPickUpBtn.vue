<template>
    <button
      @click="$emit('chart-pick-up')"
      type="button"
      class="btn-chart-position-control"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-chevron-compact-up"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"
        />
      </svg>
    </button>
</template>

<style scoped>
.bi-chevron-compact-up {
  transform: scale(2.5, 1.5);
  color: white;
}

.btn-chart-position-control {
  width: calc(100% + 20px);
  background-color: #64077769;
  border: 0px;
  color: white;
}
</style>

<script>
export default {
  name: "ChartPickUpBtn",
  emit: ["chart-pick-up"],
};
</script>
