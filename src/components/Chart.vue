<template>
  <div class="plot-container">
    <PlotlyChart :data="traces" :layout="layout" />
  </div>
</template>

<style scoped>
.plot-container {
  margin: 5px 20px 0px 0px;
  height: calc(100% - 30px);
}
</style>

<script>
import PlotlyChart from "./Charts/Plotly.vue";
import * as d3 from "d3";
import functionsExecutors from "../AnalysisFunctions/functionsExporter";

export default {
  name: "Chart",
  components: {
    PlotlyChart,
  },
  data() {
    return {
      baseTrace: null,
      functionsTraces: [],
      traces: [],
    };
  },
  props: {
    chart: Object,
    chartType: String,
    appliedFunctions: Array,
    ohlcRecordRange: String,
    addedFunction: Object,
    removedFunction: Object,
    layout: Object,
  },
  watch: {
    chartType: function () {
      this.plotChart();
    },
    addedFunction: function () {
        this.addAnalyticFunction(this.addedFunction);
    },
    removedFunction: function () {
      this.traces = this.traces.filter(
        (trace) => trace.funcName !== this.removedFunction.name
      );
      this.functionsTraces = this.functionsTraces.filter(
        (trace) => trace.funcName !== this.removedFunction.name
      );
    },
    ohlcRecordRange: function () {
      this.plotChart();
    },
  },
  created: function () {
    this.plotChart();
    this.appliedFunctions.forEach((func) => {
        this.addAnalyticFunction(func);
    });
  },
  methods: {
    addAnalyticFunction(addedFunction) {
      const dates = this.chart.data.map((d) => d.date);
      const prices = this.chart.data.map((d) => d.price);
      const funcExecutor = functionsExecutors.find(
        (func) => func.type == addedFunction.type
      );
      
      const addedTraces = funcExecutor.getTraces(
        dates,
        prices,
        addedFunction
      );

      this.functionsTraces = [...this.functionsTraces, ...addedTraces];
      this.traces = [this.baseTrace, ...this.functionsTraces];
    },
    convertToOHLC(data) {
      data.sort((a, b) => d3.ascending(a.date, b.date));
      if (this.ohlcRecordRange === "Minute") {
        data.forEach(
          (d) => (d.date = d.date.slice(0, 17) + "30" + d.date.slice(19))
        );
      } else if (this.ohlcRecordRange === "Hour") {
        data.forEach(
          (d) => (d.date = d.date.slice(0, 14) + "30:00" + d.date.slice(19))
        );
      } else if (this.ohlcRecordRange === "Day") {
        data.forEach(
          (d) => (d.date = d.date.slice(0, 11) + "12:00:00" + d.date.slice(19))
        );
      } else if (this.ohlcRecordRange === "Month") {
        data.forEach(
          (d) =>
            (d.date = d.date.slice(0, 8) + "15T00:00:00" + d.date.slice(19))
        );
      } else if (this.ohlcRecordRange === "Year") {
        data.forEach(
          (d) =>
            (d.date = d.date.slice(0, 5) + "07-01T00:00:00" + d.date.slice(19))
        );
      }
      var allDates = [...new Set(data.map((d) => d.date))];
      var result = [];
      allDates.forEach((d) => {
        var record = {};
        var filteredData = data.filter((e) => e.date === d);
        record.date = d;
        record.open = filteredData[0].price;
        record.close = filteredData[filteredData.length - 1].price;
        record.high = d3.max(filteredData, (e) => e.price);
        record.low = d3.min(filteredData, (e) => e.price);
        result.push(record);
      });
      return result;
    },
    plotChart() {
      const data = this.chart.data.map((item) => {
        return {
          date: item.date,
          price: item.price,
        };
      });
      if (this.chartType === "Candlestick") {
        this.plotOHLC(data, this.chartType);
      } else if (this.chartType === "OHLC") {
        this.plotOHLC(data, this.chartType);
      } else if (this.chartType === "Line") {
        this.plotLine(data);
      } else {
        throw `Unknown chart type - "${this.chartType}".`;
      }
    },
    plotLine(data) {
      var trace = {
        funcName: "base data",
        type: "scatter",
        mode: "lines",
        name: "Prices",
        x: data.map((d) => d.date),
        y: data.map((d) => d.price),
        line: { color: "#17BECF" },
      };

      this.baseTrace = trace;
      this.traces = [this.baseTrace, ...this.functionsTraces];
    },
    plotOHLC(data, chartType) {
    //   if (!chartType.toLowerCase() || !["candlestick", "ohlc"].includes(chartType)) {
    //     throw `Unknown OHLC type - "${chartType.toLowerCase()}".`;
    //   }
      const ohlc_data = this.convertToOHLC(data);
      const trace = {
        x: ohlc_data.map((item) => item.date),

        close: ohlc_data.map((item) => item.close),

        decreasing: { line: { color: "rgb(255, 51, 0)" } },

        high: ohlc_data.map((item) => item.high),

        increasing: { line: { color: "rgb(77, 255, 195)" } },

        line: { color: "rgba(31,119,180,1)" },

        low: ohlc_data.map((item) => item.low),

        open: ohlc_data.map((item) => item.open),

        funcName: "base data",
        name: "Prices",
        type: chartType.toLowerCase(),
        xaxis: "x",
        yaxis: "y",
      };

      this.baseTrace = trace;
      this.traces = [this.baseTrace, ...this.functionsTraces];
    },
  },
  emits: ["delete-chart", "chart-pick-up", "chart-pull-down"],
};
</script>
