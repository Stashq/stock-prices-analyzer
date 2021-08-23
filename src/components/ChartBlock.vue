<template>
  <div class="chart-block">
    <ChartPickUpButton @chart-pick-up="$emit('chart-pick-up', chart.id)" />

    <div class="fullscreen-wraper" :style="fullscreenWraperStyle">
      <button class="full-screen-btn" @click="fullScreen">
        <b-icon v-if="!isFullScreen" icon="fullscreen" />
        <b-icon v-if="isFullScreen" icon="fullscreen-exit" />
      </button>

      <ChartTypeModifier @change-chart-type="changeChartType" />

      <OHLCRecordRangeSelector
        @ohlc-record-range-changed="changeOhlcRecordRange"
      />

      <FunctionsSelector
        :chart_id="chart.id"
        :appliedFunctions="appliedFunctions"
        @add-analysing-function="addAnalysingFunction"
      />

      <AppliedFunctionsList
        :appliedFunctions="appliedFunctions"
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

      <DeleteChartButton @delete-chart="$emit('delete-chart', chart.id)" />
    </div>

    <ChartPullDownButton
      @chart-pull-down="$emit('chart-pull-down', chart.id)"
    />
  </div>
</template>

<style scoped>
.variable-row-container {
  width: 80%;
  margin: 10px 0px 5px 0px;

  display: inline-flex;
  /* center items horizontally */
  align-items: center;
}

.inputs-container {
  width: 50%;
  text-align: left;
}

.variable-name-span {
  display: inline;
  color: white;
  font-size: 40px;
  height: 45px;
  position: relative;
  top: -10px;
  left: -20px;
  width: 30%;
  text-align: right;
}




.chart-block {
  padding-right: 20px;
  background-color: #6d379969;
  overflow: hidden;
  border-radius: inherit;
}

.full-screen-btn {
  position: absolute;
  right: 30px;
  top: 40px;
  background: transparent;
  transition: 0.2s ease-in-out 0s;
  border: 0px;
  color: rgb(211, 211, 211);
  transform: scale(1.5);
}

.full-screen-btn:hover {
  transform: scale(1.75);
  color: white;
}
</style>

<script>
import Chart from "./Chart.vue";
import ChartPickUpButton from "./ChartBlockElements/ChartPickUpBtn.vue";
import ChartPullDownButton from "./ChartBlockElements/ChartPullDownBtn.vue";
import DeleteChartButton from "./ChartBlockElements/DeleteChartBtn.vue";
import ChartTypeModifier from "./ChartBlockElements/ChartTypeModifier.vue";
import OHLCRecordRangeSelector from "./ChartBlockElements/OHLCRecordRangeSelector.vue";
import FunctionsSelector from "./ChartBlockElements/FunctionsSelector.vue";
import AppliedFunctionsList from "./ChartBlockElements/AppliedFunctionsList.vue";

import constants from "../../data/constants.json";

export default {
  name: "ChartBlock",
  components: {
    Chart,
    ChartPickUpButton,
    ChartPullDownButton,
    DeleteChartButton,
    ChartTypeModifier,
    OHLCRecordRangeSelector,
    FunctionsSelector,
    AppliedFunctionsList,
  },
  data() {
    return {
      chartType: "line",
      appliedFunctions: [],
      ohlcRecordRange: "day",
      functionSelectorIsOpen: false,
      addedFunction: null,
      removedFunction: null,
      fullscreenWraperStyle: {
        position: "relative",
        height: "100%",
        width: "100%",
        left: "0px",
        top: "0px",
        "background-image": null,
        "z-index": 0,
      },
      isFullScreen: null,
      chartLayout: null,
    };
  },
  created: function () {
    this.chartLayout = constants.chart_layout.layout;
    this.chartLayout.range = [this.chart.start_date, this.chart.end_date];
    this.chartLayout.title = {
      text: `<b>${this.chart.grain}</b>: ${this.chart.start_date} - ${this.chart.end_date}`,
      font: { size: 23 },
    };
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
          "background-image": "radial-gradient(#b44b4b, #9198e5)",
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
