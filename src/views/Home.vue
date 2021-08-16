<template>
  <div>
    <Navbar />
    <Sidebar />
    <main>
      <!-- <Anychart /> -->
      <!-- <Chart /> -->
      <div :key="chart.id" v-for="chart in charts" class="dashboard-container">
        <Plotly
          :chart="chart"
          @delete-chart="deleteChart"
          @chart-pick-up="pickUpChart"
          @chart-pull-down="pullDownChart"
        />
      </div>
      <AddPlotBtn @add-chart="addChart" />
    </main>
  </div>
</template>

<style scoped>
main {
  margin-left: 290px;
}

.dashboard-container {
  border-radius: 25px;
  margin: 10px 30px;
}
</style>

<script>
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
// import Chart from "../components//Charts/ChartJS.vue";
// import Anychart from "../components/Charts/Anychart.vue";
import PlotlyChart from "../components/Charts/Plotly.vue";
import AddPlotBtn from "../components/AddChartBtn.vue";

export default {
  components: {
    Navbar: Navbar,
    Sidebar: Sidebar,
    // Chart: Chart,
    // Anychart: Anychart,
    Plotly: PlotlyChart,
    AddPlotBtn: AddPlotBtn,
  },
  data() {
    return {
      charts: [],
      charts_counter: 0,
    };
  },
  methods: {
    async addChart(start_date, end_date, grain) {
      console.log(this.$api.defaults.headers.common);
      const data = await this.$api.get(`/prices/${grain}`, {
        params: {
          start_date: start_date,
          end_date: end_date,
        },
      });
      console.log(data.data);
      const newChart = {
        id: this.charts_counter,
        grain: grain,
        data: null,
        start_date: start_date,
        end_date: end_date,
      };
      this.charts_counter += 1;
      this.charts = [...this.charts, newChart];
    },
    deleteChart(id) {
      if (confirm("Are you sure?")) {
        this.charts = this.charts.filter((chart) => chart.id !== id);
      }
    },
    pickUpChart(id) {
      const idx = this.charts.findIndex((item) => item.id === id);
      if (idx > 0) {
        const startArr = this.charts.filter((item, index) => index < idx - 1);
        const elBefore = this.charts[idx - 1];
        const el = this.charts[idx];
        const endArr = this.charts.filter((item, index) => index > idx);
        this.charts = [...startArr, el, elBefore, ...endArr];
      }
    },
    pullDownChart(id) {
      const idx = this.charts.findIndex((item) => item.id === id);
      if (idx < this.charts.length - 1) {
        const startArr = this.charts.filter((item, index) => index < idx);
        const el = this.charts[idx];
        const elAfter = this.charts[idx + 1];
        const endArr = this.charts.filter((item, index) => index > idx + 1);
        this.charts = [...startArr, elAfter, el, ...endArr];
      }
    },
  },
};
</script>
