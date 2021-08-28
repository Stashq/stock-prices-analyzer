<template>
  <Plotly
    :data="data"
    :layout="layout"
    :options="options"
    :display-mode-bar="false"
  />
</template>

<style soped>
.js-plotly-plot {
    height: 100%;
}
</style>

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
      options: {responsive: true},
    };
  },
};
</script>
