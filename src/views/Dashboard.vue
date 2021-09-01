<template>
  <div>
    <Navbar @sing-out="singOut()" />
    <Sidebar />
    <main>
      <!-- <button v-on:click="shuffle">Shuffle</button>
        <li v-for="item in items" v-bind:key="item">
          {{ item }}
        </li> -->
      <transition-group name="flip-list" tag="ul">
      <div :key="chart.id" v-for="chart in charts" class="dashboard-container">
        <ChartBlock
          :chart="chart"
          @delete-chart="deleteChart"
          @chart-pick-up="pickUpChart"
          @chart-pull-down="pullDownChart"
          @change-chart-type="changeChartType"
          @ohlc-record-range-changed="changeOhlcRecordRange"
          @add-analysing-function="addAnalysingFunction"
          @remove-function="removeAnalysingFunction"
        />
      </div>
      </transition-group>
      <div>
        <AddChartForm
          :available_commodities="available_commodities"
          @add-chart="addChart"
        />
        <!-- TODO: add correlation chart  -->
        <!-- <AddChartForm
          :available_commodities="available_commodities"
          @add-chart="addChart"
        /> -->
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 1s;
}

main {
  margin-left: 310px;
  margin-right: 10px;
}

.dashboard-container {
  border-radius: 25px;
  margin: 10px 0px;
}
</style>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import ChartBlock from "../components/ChartBlock.vue";
import AddChartForm from "../components/AddChartForm.vue";
import _ from 'lodash';

const constants = require("../../data/constants.json");

export default {
  components: {
    Navbar,
    Sidebar,
    ChartBlock,
    AddChartForm,
  },
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7],
      charts: [],
      available_commodities: constants.commodities,
      user: null,
    };
  },
  watch: {
    charts: {
      deep: true,
      handler() {
        localStorage.setItem("dashboard_state", JSON.stringify(this.charts));
      },
    },
  },
  created: function () {
    const charts = JSON.parse(localStorage.getItem("dashboard_state"));
    if (charts) {
      this.charts = charts;
    }
    this.$api
      .get("/commodities/all/names")
      .then((res) => {
        this.available_commodities = res.data;
      })
      .catch((err) => {
        // TODO: error handle
        console.log(err);
      });
  },
  methods: {
    shuffle: function () {
      this.items = _.shuffle(this.items);
    },
    changeChartType(chartType, chartId) {
      this.charts.find((chart) => chart.id === chartId).chartType = chartType;
      console.log(this.charts);
    },
    changeOhlcRecordRange(range, chartId) {
      this.charts.find((chart) => chart.id === chartId).ohlcRecordRange = range;
    },
    addAnalysingFunction(func, chartId) {
      const chart = this.charts.find((chart) => chart.id === chartId);
      chart.appliedFunctions = [...chart.appliedFunctions, func];
    },
    removeAnalysingFunction(func, chartId) {
      const chart = this.charts.find((chart) => chart.id === chartId);
      chart.appliedFunctions = chart.appliedFunctions.filter(
        (item) => item.name !== func.name
      );
    },
    async addChart(start_date, end_date, grain) {
      this.$api
        .get(`/commodities/${grain}`, {
          params: {
            start_date: start_date,
            end_date: end_date,
          },
        })
        .then((res) => {
          const data = JSON.parse(JSON.stringify(res.data))[grain];
          let rand = Math.floor(Math.random() * 1000000);
          const ids = this.charts.map((chart) => chart.id);
          while (ids.includes(rand)) {
            rand = Math.floor(Math.random() * 1000000);
          }
          const newChart = {
            id: rand,
            grain: grain,
            data: data,
            start_date: start_date,
            end_date: end_date,
            chartType: constants["chart_types"][0],
            appliedFunctions: [],
            ohlcRecordRange: "Day",
          };
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
        localStorage.removeItem(`chart_${id}`);
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
