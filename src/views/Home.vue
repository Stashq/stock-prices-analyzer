<template>
  <div>
    <Navbar @sing-out="singOut" />
    <Sidebar />
    <main>
      <div :key="chart.id" v-for="chart in charts" class="dashboard-container">
        <Chart
          :chart="chart"
          @delete-chart="deleteChart"
          @chart-pick-up="pickUpChart"
          @chart-pull-down="pullDownChart"
        />
      </div>
      <AddPlotBtn :available_grains="available_grains" @add-chart="addChart" />
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
import Chart from "../components/Chart.vue";
import AddPlotBtn from "../components/AddChartBtn.vue";

const constants = require("../../data/constants.json");

export default {
  components: {
    Navbar: Navbar,
    Sidebar: Sidebar,
    Chart: Chart,
    AddPlotBtn: AddPlotBtn,
  },
  data() {
    return {
      charts: [],
      charts_counter: 0,
      available_grains: constants.grains,
      user: null,
    };
  },
  methods: {
    async addChart(start_date, end_date, grain) {
      this.$api
        .get(`/prices/${grain}`, {
          params: {
            start_date: start_date,
            end_date: end_date,
          },
        })
        .then((res) => {
          // TODO: przejść z obserwacji na format json
          const data = JSON.parse(JSON.stringify(res.data))[grain];
          const newChart = {
            id: this.charts_counter,
            grain: grain,
            data: data,
            start_date: start_date,
            end_date: end_date,
          };
          this.charts_counter += 1;
          this.charts = [...this.charts, newChart];
        })
        .catch((err) => {
          // TODO: obsłużyć wszystkie możliwe wyjątki
          console.log(err);
        });
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
    singOut() {
      this.$api
        .post("/logout")
        .then(() => {
          this.$api.defaults.headers.common["Authorization"] = null;
          localStorage.removeItem("token");
          this.$router.push("/login");
        })
        .catch((err) => {
          this.$router.push("/login");
          console.log(err);
        });
    },
  },
};
</script>
