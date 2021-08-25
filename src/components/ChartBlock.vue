<template>
  <div class="chart-block">
    <ChartPickUpButton @chart-pick-up="$emit('chart-pick-up', chart.id)" />

    <div class="fullscreen-wraper" :style="fullscreenWraperStyle">
      <div class="chart-bar">
        <h3 class="chart-title">
          <b>{{ chart.grain }}</b>
          {{ `: ${chart.start_date} - ${chart.end_date}` }}
        </h3>
        <div class="bar-buttons-wraper">
          <button
            class="minimize-chart-btn"
            aria-label="Close"
            @click="isMinimized = !isMinimized"
          >
            <i class="fas fa-window-minimize" aria-hidden="true">—</i>
          </button>

          <button class="full-screen-btn" @click="fullScreen">
            <b-icon v-if="!isFullScreen" icon="fullscreen" />
            <b-icon v-if="isFullScreen" icon="fullscreen-exit" />
          </button>

          <button
            class="delete-chart-btn"
            aria-label="Close"
            @click="$emit('delete-chart', chart.id)"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div v-if="!isMinimized || isFullScreen">
        <ChartTypeModifier @change-chart-type="changeChartType" />

        <OHLCRecordRangeSelector
          @ohlc-record-range-changed="changeOhlcRecordRange"
        />

        <AppliedFunctionsList
          :chartId="chart.id"
          :appliedFunctions="appliedFunctions"
          @add-analysing-function="addAnalysingFunction"
          @remove-function="removeAnalysingFunction"
        />

        <Chart
          :chart="chart"
          :chartType="chartType"
          :appliedFunctions="appliedFunctions"
          :addedFunction="addedFunction"
          :removedFunction="removedFunction"
          :ohlcRecordRange="ohlcRecordRange"
          :layout="chartLayout"
        />
      </div>
    </div>

    <ChartPullDownButton
      @chart-pull-down="$emit('chart-pull-down', chart.id)"
    />
  </div>
</template>

<style scoped>
.chart-bar {
  background-color: rgba(3, 3, 31, 0.3);
  width: 100%;
  color: white;
  padding: 5px 0px;
}

.chart-title {
  display: inline-block;
  margin: auto;
  position: center;
  width: 70%;
}

.bar-buttons-wraper {
  position: absolute;
  right: 0px;
  top: 10px;
}

.full-screen-btn,
.delete-chart-btn,
.minimize-chart-btn {
  padding: 0px;
  margin: 0px 10px;
  background: transparent;
  transition: 0.2s ease-in-out 0s;
  border: 0px;
  color: rgb(211, 211, 211);
}

.delete-chart-btn {
  right: 0px;
  transform: scale(2.5);
}

.delete-chart-btn:hover {
  transform: scale(3.5);
  color: white;
}

.full-screen-btn {
  right: 40px;
  transform: scale(1.5);
}

.full-screen-btn:hover {
  transform: scale(1.75);
  color: white;
}

.minimize-chart-btn {
  right: 90px;
  transform: scale(1.5);
}

.minimize-chart-btn:hover {
  transform: scale(1.75);
  color: white;
}

.chart-block {
  background-color: #6d379969;
  overflow: hidden;
  border-radius: inherit;
}
</style>

<script>
import Chart from "./Chart.vue";
import ChartPickUpButton from "./ChartBlockElements/ChartPickUpBtn.vue";
import ChartPullDownButton from "./ChartBlockElements/ChartPullDownBtn.vue";
import ChartTypeModifier from "./ChartBlockElements/ChartTypeModifier.vue";
import OHLCRecordRangeSelector from "./ChartBlockElements/OHLCRecordRangeSelector.vue";
import AppliedFunctionsList from "./ChartBlockElements/AppliedFunctionsList.vue";

import constants from "../../data/constants.json";

export default {
  name: "ChartBlock",
  components: {
    Chart,
    ChartPickUpButton,
    ChartPullDownButton,
    ChartTypeModifier,
    OHLCRecordRangeSelector,
    AppliedFunctionsList,
  },
  data() {
    return {
      chartType: "line",
      appliedFunctions: [],
      ohlcRecordRange: "Day",
      functionSelectorIsOpen: false,
      addedFunction: null,
      removedFunction: null,
      fullscreenWraperStyle: {
        position: "relative",
        height: "100%",
        width: "100%",
        left: "0px",
        top: "0px",
        "background-color": "#6d379969",
        "z-index": 0,
      },
      isFullScreen: false,
      chartLayout: null,
      isMinimized: false,
    };
  },
  created: function () {
    this.chartLayout = constants.chart_layout.layout;
    this.chartLayout.range = [this.chart.start_date, this.chart.end_date];
  },
  props: {
    chart: Object,
  },
  methods: {
    fullScreen() {
      //TODO: dostosować Plotly do rozmiarów okna; strzałki w prawo i lewo
      if (!this.isFullScreen) {
        this.fullscreenWraperStyle = {
          position: "fixed",
          height: "100%",
          width: "100%",
          left: "0px",
          top: "0px",
          "background-color": "#824691",
          "z-index": 1,
        };
        this.isFullScreen = true;
      } else {
        this.fullscreenWraperStyle = {
          position: "relative",
          height: "100%",
          width: "100%",
          left: "0px",
          top: "0px",
          "background-image": null,
          "background-color": "#6d379969",
          "z-index": 0,
        };
        this.isFullScreen = false;
      }
    },
    changeChartType(chartType) {
      this.chartType = chartType;
    },
    changeOhlcRecordRange(range) {
      this.ohlcRecordRange = range;
    },
    addAnalysingFunction(func) {
      this.appliedFunctions = [...this.appliedFunctions, func];
      this.addedFunction = func;
    },
    removeAnalysingFunction(func) {
      this.appliedFunctions = this.appliedFunctions.filter(
        (item) => item.name !== func.name
      );
      this.removedFunction = func;
    },
  },
  emits: ["delete-chart", "chart-pick-up", "chart-pull-down"],
};
</script>
