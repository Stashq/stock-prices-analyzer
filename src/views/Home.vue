<template>
  <div>
    <Navbar />
    <Sidebar />
    <main>
      <Plotly />
      <Anychart />
      <Chart />
    </main>
  </div>
</template>
); }

<script>
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Chart from "../components//Charts/ChartJS.vue";
import Anychart from "../components/Charts/Anychart.vue";
import PlotlyChart from "../components/Charts/Plotly.vue";

export default {
  components: {
    Navbar: Navbar,
    Sidebar: Sidebar,
    Chart: Chart,
    Anychart: Anychart,
    Plotly: PlotlyChart,
  },
  data() {
    return {
      data: [
        {
          x: [1, 2, 3, 4],
          y: [10, 15, 13, 17],
          type: "scatter",
        },
      ],
      layout: {
        title: "My graph",
      },
    };
  },
};
</script>

<style scoped>
main {
  margin-left: 290px;
}
</style>
