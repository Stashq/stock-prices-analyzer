<template>
  <div class="chart-block">
    <ChartPickUpButton @chart-pick-up="$emit('chart-pick-up', chart.id)" />

      <div id="full-screen-wraper" :style="fullScreenWraperStyle" ref="fullScreen">
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
              <i
                v-if="!isMinimized"
                class="fas fa-window-minimize"
                aria-hidden="true"
                >—</i
              >
              <b-icon v-if="isMinimized" icon="plus" />
            </button>

            <button
              class="full-screen-btn"
              @click="isFullScreen = !isFullScreen"
            >
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

        <collapse-transition>
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
            </div>
            <Chart
              :chart="chart"
              :chartType="chart.chartType"
              :appliedFunctions="chart.appliedFunctions"
              :addedFunction="addedFunction"
              :removedFunction="removedFunction"
              :ohlcRecordRange="chart.ohlcRecordRange"
              :layout="chartLayout"
              :height="chartHeight"
            />
          </div>
        </collapse-transition>
      </div>

    <ChartPullDownButton
      @chart-pull-down="$emit('chart-pull-down', chart.id)"
    />
  </div>
</template>

<style lang="scss" scoped>
// .expand-enter-from {
//   height: 450px;
// }
// .expand-enter-from {
//   height: 450px;
// }
// .expand-enter-to {
//   height: 100%;
// }

.expand-enter-active,
.expand-leave-active {
  transition-property: height;
  transition-duration: 1.25s;
}

.chart-with-buttons {
  width: 100%;
  height: 30px;
  position: relative;
}

.chart-content {
  height: calc(100% - 55px);
}

.chart-bar {
  background-color: $theme1-color17;
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
import { CollapseTransition } from "@ivanv/vue-collapse-transition";

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
    CollapseTransition,
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
        "transition-property": "height",
        transition: "height 1.25s ease-out",
      },
      isFullScreen: false,
      chartLayout: null,
      isMinimized: false,
      chartHeight: "450px",
      mutex: false,
    };
  },
  props: {
    chart: Object,
  },
  watch: {
    isFullScreen: function () {
      if (!self.mutex) {
        this.changeFullScreen();
      }
    },
    isMinimized: function () {
      if (!self.mutex) {
        this.changeMinimized();
      }
    },
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
    changeMinimized() {
      this.fullScreenWraperStyle["height"] = "auto";
      if (this.isMinimized === true) {
        this.isFullScreen = false;
      }
    },
    changeFullScreen() {
      if (this.isFullScreen) {
        this.fullScreenWraperStyle = {
          position: "fixed",
          height: "100%",
          width: "100%",
          left: "0px",
          top: "0px",
          "background-color": "#824691",
          "z-index": 1,
          //   "transition-property": "height",
          //   transition: "height 1.25s ease-out",
        };
        this.chartHeight = "calc(100% - 150px)";
        this.isMinimized = false;
      } else {
        this.fullScreenWraperStyle = {
          position: "relative",
          height: "auto",
          width: "100%",
          left: "0px",
          top: "0px",
          "background-image": null,
          "background-color": "#6d379969",
          "z-index": 0,
          //   "transition-property": "height",
          //   transition: "height 1.25s ease-out",
        };
        this.chartHeight = "450px";
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
