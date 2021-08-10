<template>
  <div>
    <Navbar />
    <Sidebar />
    <main>
      <!-- <Anychart /> -->
      <!-- <Chart /> -->
      <div :key="chart.id" v-for="chart in charts" class="dashboard-container">
        <Plotly :chart="chart" @delete-chart="deleteChart"/>
      </div>

      <div class="dashboard-container">
        <button @click="addChart" type="button" class="btn-plot-adder">
          <b-icon class="plus-icon" icon="plus-square" />
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
main {
  margin-left: 290px;
}

.dashboard-container {
  margin: 10px 30px 10px 30px;
  border-radius: 25px;
}

.btn-plot-adder {
  display: block;
  width: 100%;
  border-radius: 25px;
  border: 0px;
  background-color: #64077769;
  color:white;
}
</style>

<script>
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
// import Chart from "../components//Charts/ChartJS.vue";
// import Anychart from "../components/Charts/Anychart.vue";
import PlotlyChart from "../components/Charts/Plotly.vue";

export default {
  components: {
    Navbar: Navbar,
    Sidebar: Sidebar,
    // Chart: Chart,
    // Anychart: Anychart,
    Plotly: PlotlyChart,
  },
  data() {
    return {
        charts: [],
        charts_counter: 0,
    };
  },
  methods: {
      addChart() {
          const newChart = {
              id: this.charts_counter,
              grain: null,
              data: null,
              start_date: null,
              end_date: null,
          }
          this.charts_counter += 1;
          this.charts = [...this.charts, newChart];
      },
      deleteChart(id) {
          if(confirm('Are you sure?')) {
                this.charts = this.charts.filter(
                    (chart) => chart.id !== id
                )
            }
      }
  }
};
</script>
