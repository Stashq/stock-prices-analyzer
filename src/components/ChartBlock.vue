<template>
  <div class="chart-block">
    <ChartPickUpButton @chart-pick-up="$emit('chart-pick-up', chart.id)" />

    <!-- <div class="interaction">
      <button @click="toggleBigger">
        <transition name="expand" mode="out-in">
          <div class="default" v-bind:class="{ bigger: showButton }">B</div>
        </transition>
      </button>
    </div> -->

    <transition name="full-screen">
      <div
        id="full-screen-wraper"
        class="default-chart"
        :class="{ 'full-screen-chart': isFullScreen }"
      >
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
    </transition>

    <ChartPullDownButton
      @chart-pull-down="$emit('chart-pull-down', chart.id)"
    />
  </div>
</template>

<style lang="scss" scoped>
.default-chart {
  position: relative;
  height: auto;
  width: 100%;
  left: 0px;
  top: 0px;
  background-color: #6d379969;
  z-index: 0;
  transition-property: height, width, left, top;
}

.full-screen-chart {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0px;
  top: 0px;
  background-color: #824691;
  z-index: 1;
  transition-property: height, width, left, top;
}

// // Try with full screen transition 
// .full-screen-enter-active,
// .full-screen-leave-active {
//   transition-property: height, width, left, top;
//   transition-duration: 5s;
// }

// .full-screen-leave-to {
//   height: 100%;
//   width: 100%;
// }

// .full-screen-enter {
//   height: auto;
//   width: 100%;
//   left: 0px;
//   top: 0px;
// }



// // Example with button 
// .interaction {
//   border: 10px solid lightgreen;
//   max-height: 225px;
//   transition: max-height 0.25s ease-out;
// }

// .default {
//   transition: max-height 0.25s ease-out;
//   position: relative;
//   height: auto;
//   width: 100%;
//   left: 0px;
//   top: 0px;
//   background-color: #6d379969;
//   z-index: 0;
//   transition-property: all;
// }
// .bigger {
//   transition: max-height 0.25s ease-out;
//   position: fixed;
//   height: 100%;
//   width: 100%;
//   left: 0px;
//   top: 0px;
//   background-color: #824691;
//   z-index: 1;
//   transition-duration: 5s;
//   transition-property: all;
// }

// .expand-enter-active,
// .expand-leave-active {
//   transition-property: all;
//   transition-duration: 5s;
// }

// .expand-leave-to {
//   width: 200px;
//   height: 200px;
// }

// .expand-enter {
//   width: 20px;
//   height: 20px;
// }





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
      showButton: true,
      show: true,
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
    toggleBigger() {
      this.showButton = !this.showButton;
    },
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
        // this.fullScreenWraperStyle = {
        //   position: "fixed",
        //   height: "100%",
        //   width: "100%",
        //   left: "0px",
        //   top: "0px",
        //   "background-color": "#824691",
        //   "z-index": 1,
        // };
        this.chartHeight = "calc(100% - 150px)";
        this.isMinimized = false;
      } else {
        // this.fullScreenWraperStyle = {
        //   position: "relative",
        //   height: "auto",
        //   width: "100%",
        //   left: "0px",
        //   top: "0px",
        //   "background-image": null,
        //   "background-color": "#6d379969",
        //   "z-index": 0,
        // };
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
