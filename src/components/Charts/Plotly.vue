<template>
  <Plotly :data="traces" :layout="layout" :display-mode-bar="false"></Plotly>
</template>

<style scoped>
</style>

<script>
import { Plotly } from "vue-plotly";
import * as d3 from "d3";
import {
  ma, // dma, ema, sma, wma
} from "moving-averages";

import constants from "../../../data/constants.json";

export default {
  name: "PlotlyChart",
  components: {
    Plotly,
  },
  data() {
    return {
      baseTrace: null,
      functionsTraces: [],
      traces: [],
      layout: null,
      plotlyChart: null,
    };
  },
  props: {
    chart: Object,
    chartType: String,
    appliedFunctions: Array,
    ohlcRecordRange: String,
    addedFunction: Object,
    removedFunction: Object,
  },
  watch: {
    chartType: function () {
      this.plotChart();
    },
    addedFunction: function () {
      if (this.addedFunction.type === "moving average") {
        this.addSimpleMovingAverage(this.addedFunction);
      } else if (this.addedFunction.type === "moving average envelope") {
        this.addSimpleMovingAverageEnvelope(this.addedFunction);
      }
    },
    removedFunction: function () {
       this.traces = this.traces.filter((trace) => trace.funcName !== this.removedFunction.name);
       
       console.log(this.plotlyChart);
    },
    ohlcRecordRange: function () {
      this.plotChart();
    },
  },
  created: function () {
    this.layout = constants.chart_layout.layout;
    this.layout.range = [this.chart.start_date, this.chart.end_date];
    this.layout.title = {
      text: `<b>${this.chart.grain}</b>: ${this.chart.start_date} - ${this.chart.end_date}`,
      font: { size: 23 },
    };

    this.plotChart();
  },
  methods: {
    convertToOHLC(data) {
      data.sort((a, b) => d3.ascending(a.date, b.date));
      if (this.ohlcRecordRange === "minute") {
        data.forEach(
          (d) => (d.date = d.date.slice(0, 17) + "30" + d.date.slice(19))
        );
      } else if (this.ohlcRecordRange === "hour") {
        data.forEach(
          (d) => (d.date = d.date.slice(0, 14) + "30:00" + d.date.slice(19))
        );
      } else if (this.ohlcRecordRange === "day") {
        data.forEach(
          (d) => (d.date = d.date.slice(0, 11) + "12:00:00" + d.date.slice(19))
        );
      } else if (this.ohlcRecordRange === "month") {
        data.forEach(
          (d) =>
            (d.date = d.date.slice(0, 8) + "15T00:00:00" + d.date.slice(19))
        );
      } else if (this.ohlcRecordRange === "year") {
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
      if (this.chartType === "candlestick") {
        this.plotOHLC(data, this.chartType);
      } else if (this.chartType === "ohlc") {
        this.plotOHLC(data, this.chartType);
      } else if (this.chartType === "line") {
        this.plotLine(data);
      } else {
        throw `Unknown chart type - "${this.chartType}".`;
      }
    },
    plotLine(data) {
      var trace = {
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
      if (!chartType || !["candlestick", "ohlc"].includes(chartType)) {
        throw `Unknown OHLC type - "${chartType}".`;
      }
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

        name: "Prices",
        type: chartType,
        xaxis: "x",
        yaxis: "y",
      };

      this.baseTrace = trace;
      this.traces = [this.baseTrace, ...this.functionsTraces];
    },
    addSimpleMovingAverage(func) {
      //TODO: validate length of timeseries and period
      const prices = this.chart.data.map((d) => d.price);
      const movingAverage = ma(prices, func.args.period);
      const dates = this.chart.data
        .slice(this.chart.data.length - movingAverage.length)
        .map((d) => d.date);

      const trace = {
        funcName: func.name,
        type: "scatter",
        mode: "lines",
        name: `MA (${func.args.period})`,
        x: dates,
        y: movingAverage,
        line: { color: func.color },
      };

      this.functionsTraces = [...this.functionsTraces, trace];
      this.traces = [this.baseTrace, ...this.functionsTraces];
    },
    addSimpleMovingAverageEnvelope(func) {
      //TODO: validate length of timeseries and period
      const prices = this.chart.data.map((d) => d.price);
      const movingAverage = ma(prices, func.args.period);
      const dates = this.chart.data
        .slice(this.chart.data.length - movingAverage.length)
        .map((d) => d.date);

      var lowerTrace = {
        funcName: func.name,
        x: dates,
        y: movingAverage.map((item) => item * (1 - 0.01 * func.args.precent)),
        fill: null,
        name: `MA_low(${func.args.period}, -${func.args.precent})`,
        type: "scatter",
        line: { color: func.color },
      };

      var upperTrace = {
        funcName: func.name,
        x: dates,
        y: movingAverage.map((item) => item * (1 + 0.01 * func.args.precent)),
        fill: "tonexty",
        name: `MA_high(${func.args.period}, +${func.args.precent})`,
        type: "scatter",
        line: { color: func.color },
      };

      this.functionsTraces = [...this.functionsTraces, lowerTrace, upperTrace];
      this.traces = [this.baseTrace, ...this.functionsTraces];
    },
  },
  emits: ["delete-chart", "chart-pick-up", "chart-pull-down"],
};
</script>
