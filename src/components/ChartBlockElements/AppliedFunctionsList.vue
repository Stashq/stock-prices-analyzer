<template>
  <div v-if="appliedFunctions.length !== 0" class="functions-list">
    <div class="functions-list-el" :key="func.name" v-for="func in appliedFunctions">
      <span class="function-span">
        {{ func.name }}
      </span>

      <button @click="$emit('remove-function', func)" class="function-remove-button">
        <b-icon icon="x-square-fill" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.functions-list {
  padding: 20px;
  background-color: #b84f1f69;
  width: 80%;
  margin: 10px auto;
  border-radius: 10px;
}

.functions-list-el {
  display: inline-block;
  background-color: #6d379969;
  margin: 0px 5px;
  border-radius: 5px;
}

.function-span {
  color: white;
  background-color: #6d379900;
  padding: 5px;
}

.function-remove-button {
  color: rgb(216, 15, 15);
  background-color: #6d3799c4;
  padding: 5px;
  border: 0px;
  border-radius: 0px 5px 5px 0px;
}

</style>

<script>
export default {
  name: "AppliedFunctionsList",
  props: {
    appliedFunctions: null,
  },
  emits: ["remove-function"],
};
</script>
