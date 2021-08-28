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
      @add-analysing-function="addAnalysingFunction"
    />
  </div>
</template>

<style scoped>
.functions-list-block {
  padding: 10px;
  background-color: #b84f1f69;
  width: calc(100% - 60px);
  max-height: 120px;
  margin: 10px auto;
  border-radius: 5px;
  overflow-y: scroll;
}

.functions-list-block::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: #00000000;
}

.functions-list-block::-webkit-scrollbar
{
  width: 12px;
  background-color: #00000000;
}

.functions-list-block::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #7272728c;
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
  methods: {
    addAnalysingFunction(func) {
        this.$emit('add-analysing-function', func);
    },
  },
  emits: ["remove-function", "add-analysing-function"],
};
</script>
