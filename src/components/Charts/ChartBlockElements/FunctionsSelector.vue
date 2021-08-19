<template>
    <div>
    <select v-model="addedFunction">
      <option value="" disabled selected>Select function</option>
      <option :value="fun" :key="fun.name" v-for="fun in analysisFunctions">
        {{ fun.name }}
      </option>
    </select>
    <button @click="$emit('add-analysing-function', addedFunction)">Add function</button>
    </div>
</template>

<script>
export default {
    name: "FunctionsSelector",
    data() {
        return {
            analysisFunctions: [{ id: 0, name: "moving average" }],
            addedFunction: null,
        }
    },
    emits: ["add-analysing-function"],
}
</script>
