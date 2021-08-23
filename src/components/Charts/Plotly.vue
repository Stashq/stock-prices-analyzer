<template>
  <Plotly
    :data="data"
    :layout="layout"
    :options="options"
    :display-mode-bar="false"
  />
</template>

<script>
import { Plotly } from "vue-plotly";

export default {
  name: "PlotlyChart",
  components: {
    Plotly,
  },
  props: {
    data: Array,
    layout: Object,
  },
  data() {
    return {
      options: {},
    };
  },
};
</script>
