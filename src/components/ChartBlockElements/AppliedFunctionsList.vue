<template>
  <div class="functions-list-block">
    <h1 id="list-placeholder" v-if="appliedFunctions.length === 0">Analytics functions </h1>
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
  </div>
</template>

<style lang="scss" scoped>
#list-placeholder {
    font-style: italic;
    color: #64311abd;
}

.functions-list-block {
  border: 2px solid #eeeeee69;
  padding: 10px;
  background-color: $theme1-color5;
  width: calc(100% - 60px);
  height: 120px;
  margin: 10px auto;
  border-radius: 5px;
  overflow-y: scroll;
}

.functions-list-block::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #00000000;
}

.functions-list-block::-webkit-scrollbar {
  width: 12px;
  background-color: #00000000;
}

.functions-list-block::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
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
  background-color: $theme1-color15;
  padding: 5px;
  border: 0px;
  border-radius: 0px 4px 4px 0px;
}
</style>

<script>
export default {
  name: "AppliedFunctionsList",
  props: {
    chartId: Number,
    appliedFunctions: Array,
  },
  methods: {
    addAnalysingFunction(func) {
      this.$emit("add-analysing-function", func);
    },
  },
  emits: ["remove-function", "add-analysing-function"],
};
</script>
