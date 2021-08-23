<template>
  <div class="functions-list-block">
    <div
      :key="func.name"
      v-for="func in appliedFunctions"
      :style="`background-color: ${func.color};`"
      class="functions-list-el"
    >
      <span class="function-span">
        {{ func.name }}
      </span>

      <button
        @click="$emit('remove-function', func)"
        class="function-remove-button"
      >
        <b-icon icon="x-square-fill" />
      </button>
    </div>

    <FunctionsSelector
      :chartId="chartId"
      :appliedFunctions="appliedFunctions"
      @add-analysing-function="$emit('add-analysing-function', $event)"
    />
  </div>
</template>

<style scoped>
.functions-list-block {
  padding: 20px;
  background-color: #b84f1f69;
  width: 80%;
  margin: 10px auto;
  border-radius: 10px;
}

.functions-list-el {
  display: inline-block;
  margin: 3px 5px;

  border-radius: 5px;
}

.function-span {
  color: white;
  padding: 5px;
}

.function-remove-button {
  color: rgb(216, 15, 15);
  background-color: #6d3799c4;
  padding: 5px;
  border: 0px;
  border-radius: 0px 4px 4px 0px;
}
</style>

<script>
import FunctionsSelector from "./FunctionsSelector.vue";

export default {
  name: "AppliedFunctionsList",
  components: {
    FunctionsSelector,
  },
  props: {
    chartId: Number,
    appliedFunctions: Array,
  },
  emits: ["remove-function", "add-analysing-function"],
};
</script>
