<template>
  <div class="chart">
    <ChartPickUpButton @chart-pick-up="$emit('chart-pick-up', chart.id)" />

    <ChartTypeModifier @change-chart-type="changeChartType" />

    <OHLCRecordRangeSelector
      @ohlc-record-range-changed="changeOhlcRecordRange"
    />

    <FunctionsSelector @add-analysing-function="addAnalysingFunction" />

    <AppliedFunctionsList :appliedFunctions="appliedFunctions" />

    <PlotlyChart
      :key="chart.id"
      :chart="chart"
      :chartType="chartType"
      :appliedFunctions="appliedFunctions"
      :ohlcRecordRange="ohlcRecordRange"
    />

    <DeleteChartButton @delete-chart="$emit('delete-chart', chart.id)" />

    <ChartPullDownButton
      @chart-pull-down="$emit('chart-pull-down', chart.id)"
    />
  </div>
</template>

<style scoped>
.chart {
  padding-right: 20px;
  background-color: #6d379969;
  overflow: hidden;
  position: relative;
  border-radius: inherit;
}
</style>

<script>
import PlotlyChart from "./Charts/Plotly.vue";
import ChartPickUpButton from "./ChartBlockElements/ChartPickUpBtn.vue";
import ChartPullDownButton from "./ChartBlockElements/ChartPullDownBtn.vue";
import DeleteChartButton from "./ChartBlockElements/DeleteChartBtn.vue";
import ChartTypeModifier from "./ChartBlockElements/ChartTypeModifier.vue";
import OHLCRecordRangeSelector from "./ChartBlockElements/OHLCRecordRangeSelector.vue";
import FunctionsSelector from "./ChartBlockElements/FunctionsSelector.vue";
import AppliedFunctionsList from "./ChartBlockElements/AppliedFunctionsList.vue";

export default {
  name: "Chart",
  components: {
    PlotlyChart,
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
    };
  },
  props: {
    chart: Object,
  },
  methods: {
    changeChartType(chartType) {
      this.chartType = chartType;
    },
    changeOhlcRecordRange(range) {
      this.ohlcRecordRange = range;
    },
    addAnalysingFunction(func) {
      this.appliedFunctions = [...this.appliedFunctions, func];
    },
  },
  emits: ["delete-chart", "chart-pick-up", "chart-pull-down"],
};
</script>
