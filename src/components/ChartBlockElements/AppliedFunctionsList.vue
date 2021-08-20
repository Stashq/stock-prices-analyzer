<template>
  <div>
    <span :key="fun.id" v-for="fun in appliedFunctions">
      {{ fun.name }}
    </span>
  </div>
</template>

<script>
export default {
  name: "AppliedFunctionsList",
  props: {
    appliedFunctions: [],
  },
};
</script>
