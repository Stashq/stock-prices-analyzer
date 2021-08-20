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
    };
  },
  props: {
    chart: Object,
    chartType: String,
    appliedFunctions: [],
    ohlcRecordRange: String,
  },
  watch: {
    chartType: function () {
      this.plotChart();
    },
    appliedFunctions: function () {
      this.addSimpleMovingAverageEnvelope(20, 10);
    },
    ohlcRecordRange: function () {
      this.plotChart();
    },
  },
  created: function () {
    const selectorOptions = {
      buttons: [
        {
          step: "month",
          stepmode: "backward",
          count: 1,
          label: "1m",
        },
        {
          step: "month",
          stepmode: "backward",
          count: 6,
          label: "6m",
        },
        {
          step: "year",
          stepmode: "todate",
          count: 1,
          label: "YTD",
        },
        {
          step: "year",
          stepmode: "backward",
          count: 1,
          label: "1y",
        },
        {
          step: "all",
        },
      ],
      font: {
        color: "black",
      },
    };

    const sliderOptions = {
      bgcolor: "rgba(255, 255, 255, 0.5)",
      borderwidth: "30px",
    };
    this.layout = {
      dragmode: "zoom",
      font: {
        color: "white",
      },
      margin: {
        r: 10,
        t: 25,
        b: 40,
        l: 60,
      },
      showlegend: false,
      xaxis: {
        autorange: true,
        domain: [0, 1],
        range: [this.chart.start_date, this.chart.end_date],
        rangeslider: sliderOptions,
        rangeselector: selectorOptions,
        type: "date",
      },
      yaxis: {
        autorange: true,
        domain: [0, 1],
        type: "linear",
      },
      title: {
        text: `<b>${this.chart.grain}</b>: ${this.chart.start_date} - ${this.chart.end_date}`,
        font: { size: 23 },
      },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
    };

    this.plotChart();
  },
  methods: {
    convertToOHLC(data) {
      data.sort((a, b) => d3.ascending(a.date, b.date));
      if (this.ohlcRecordRange === "minute") {
        data.forEach(
          (d) => (d.date = d.date.slice(0, 17) + "00" + d.date.slice(19))
        );
      } else if (this.ohlcRecordRange === "hour") {
        data.forEach(
          (d) => (d.date = d.date.slice(0, 14) + "00:00" + d.date.slice(19))
        );
      } else if (this.ohlcRecordRange === "day") {
        data.forEach(
          (d) => (d.date = d.date.slice(0, 11) + "00:00:00" + d.date.slice(19))
        );
      } else if (this.ohlcRecordRange === "month") {
        data.forEach(
          (d) =>
            (d.date = d.date.slice(0, 8) + "01T00:00:00" + d.date.slice(19))
        );
      } else if (this.ohlcRecordRange === "year") {
        data.forEach(
          (d) =>
            (d.date = d.date.slice(0, 5) + "01-01T00:00:00" + d.date.slice(19))
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
    addSimpleMovingAverage(period) {
      //TODO: validate length of timeseries and period
      const prices = this.chart.data.map((d) => d.price);
      const movingAverage = ma(prices, period);
      const dates = this.chart.data
        .slice(this.chart.data.length - movingAverage.length)
        .map((d) => d.date);

      const trace = {
        type: "scatter",
        mode: "lines",
        name: `Moving average ${period}`,
        x: dates,
        y: movingAverage,
        line: { color: "rgb(102, 0, 255)" },
      };

      this.functionsTraces = [...this.functionsTraces, trace];
      this.traces = [this.baseTrace, ...this.functionsTraces];
    },
    addSimpleMovingAverageEnvelope(period, precent) {
      //TODO: validate length of timeseries and period
      const prices = this.chart.data.map((d) => d.price);
      const movingAverage = ma(prices, period);
      const dates = this.chart.data
        .slice(this.chart.data.length - movingAverage.length)
        .map((d) => d.date);

      var lowerTrace = {
        x: dates,
        y: movingAverage.map((item) => item*(1 - 0.01*precent)),
        fill: null,
        type: "scatter",
        line: { color: "rgb(0, 153, 51)" },
      };

      var upperTrace = {
        x: dates,
        y: movingAverage.map((item) => item*(1 + 0.01*precent)),
        fill: "tonexty",
        type: "scatter",
        line: { color: "rgb(0, 153, 51)" },
      };

      this.functionsTraces = [...this.functionsTraces, lowerTrace, upperTrace];
      this.traces = [this.baseTrace, ...this.functionsTraces];
    },
  },
  emits: ["delete-chart", "chart-pick-up", "chart-pull-down"],
};
</script>
