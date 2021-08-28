<template>
  <div class="chart-block">
    <ChartPickUpButton @chart-pick-up="$emit('chart-pick-up', chart.id)" />

    <div id="full-screen-wraper" :style="fullScreenWraperStyle">
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

      <div class="chart-content" v-if="!isMinimized">
        <AppliedFunctionsList
          :chartId="chart.id"
          :appliedFunctions="chart.appliedFunctions"
          @add-analysing-function="addAnalysingFunction"
          @remove-function="removeAnalysingFunction"
        />
        <div class="chart-with-buttons">
          <FunctionsSelector
            :chartId="chart.id"
            :appliedFunctions="chart.appliedFunctions"
            @add-analysing-function="addAnalysingFunction"
          />
          <SelectsBlock
            @ohlc-record-range-changed="changeOhlcRecordRange"
            @change-chart-type="changeChartType"
            :chartType="chart.chartType"
            :recordRange="chart.ohlcRecordRange"
          />
          <Chart
            :chart="chart"
            :chartType="chart.chartType"
            :appliedFunctions="chart.appliedFunctions"
            :addedFunction="addedFunction"
            :removedFunction="removedFunction"
            :ohlcRecordRange="chart.ohlcRecordRange"
            :layout="chartLayout"
          />
        </div>
      </div>
    </div>

    <ChartPullDownButton
      @chart-pull-down="$emit('chart-pull-down', chart.id)"
    />
  </div>
</template>

<style scoped>
.chart-with-buttons {
  position: relative;
  height: calc(100% - 165px);
}

.chart-content {
  height: 100%;
}

.chart-bar {
  background-color: rgba(3, 3, 31, 0.3);
  width: 100%;
  height: 45px;
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
  min-width: 1050px;
}
</style>

<script>
import Chart from "./Chart.vue";
import ChartPickUpButton from "./ChartBlockElements/ChartPickUpBtn.vue";
import ChartPullDownButton from "./ChartBlockElements/ChartPullDownBtn.vue";
import SelectsBlock from "./ChartBlockElements/SelectsBlock.vue";
import AppliedFunctionsList from "./ChartBlockElements/AppliedFunctionsList.vue";
import FunctionsSelector from "./ChartBlockElements/FunctionsSelector.vue";

import constants from "../../data/constants.json";

export default {
  name: "ChartBlock",
  components: {
    Chart,
    ChartPickUpButton,
    ChartPullDownButton,
    SelectsBlock,
    AppliedFunctionsList,
    FunctionsSelector,
  },
  data() {
    return {
      addedFunction: null,
      removedFunction: null,
      functionSelectorIsOpen: false,
      fullScreenWraperStyle: {
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
  props: {
    chart: Object,
  },
  created: function () {
    this.chartLayout = constants.chart_layout.layout;
    this.chartLayout.range = [this.chart.start_date, this.chart.end_date];
  },
  methods: {
    changeChartType(chartType) {
      this.$emit("change-chart-type", chartType, this.chart.id);
    },
    changeOhlcRecordRange(range) {
      this.$emit("ohlc-record-range-changed", range, this.chart.id);
    },
    addAnalysingFunction(func) {
      this.addedFunction = func;
      this.$emit("add-analysing-function", func, this.chart.id);
    },
    removeAnalysingFunction(func) {
      this.removedFunction = func;
      this.$emit("remove-function", func, this.chart.id);
    },
    fullScreen() {
      //TODO: dostosować Plotly do rozmiarów okna; strzałki w prawo i lewo
      if (!this.isFullScreen) {
        this.fullScreenWraperStyle = {
          position: "fixed",
          height: "100%",
          left: "0px",
          top: "0px",
          "background-color": "#824691",
          "z-index": 1,
        };
        this.isMinimized = false;
        this.isFullScreen = true;
      } else {
        this.fullScreenWraperStyle = {
          position: "relative",
          height: "650px",
          left: "0px",
          top: "0px",
          "background-image": null,
          "background-color": "#6d379969",
          "z-index": 0,
        };
        this.isFullScreen = false;
      }
    },
  },
  emits: [
    "delete-chart",
    "chart-pick-up",
    "chart-pull-down",
    "change-chart-type",
    "ohlc-record-range-changed",
    "add-analysing-function",
    "remove-function",
  ],
};
</script>
