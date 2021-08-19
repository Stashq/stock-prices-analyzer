<template>
  <div class="chart">
    <ChartPickUpButton @chart-pick-up="$emit('chart-pick-up', chart.id)"/>

    <ChartTypeModifier @change-chart-type="changeChartType"/>

    <OHLCRecordRangeSelector @ohlc-record-range-changed="changeOhlcRecordRange"/>

    <FunctionsSelector @add-analysing-function="addAnalysingFunction"/>

    <div>
      <span :key="fun.id" v-for="fun in appliedFunctions">
        {{ fun.name }}
      </span>
    </div>

    <Plotly
      :data="processed_data"
      :layout="layout"
      :display-mode-bar="false"
    ></Plotly>

    <DeleteChartButton @delete-chart="$emit('delete-chart', chart.id)"/>
    <ChartPullDownButton @chart-pull-down="$emit('chart-pull-down', chart.id)"/>
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
import { Plotly } from "vue-plotly";
import * as d3 from "d3";
import ChartPickUpButton from "./ChartBlockElements/ChartPickUpBtn.vue"
import ChartPullDownButton from "./ChartBlockElements/ChartPullDownBtn.vue"
import DeleteChartButton from "./ChartBlockElements/DeleteChartBtn.vue"
import ChartTypeModifier from "./ChartBlockElements/ChartTypeModifier.vue"
import OHLCRecordRangeSelector from "./ChartBlockElements/OHLCRecordRangeSelector.vue"
import FunctionsSelector from "./ChartBlockElements/FunctionsSelector.vue"


export default {
  name: "PlotlyChart",
  components: {
    Plotly,
    ChartPickUpButton,
    ChartPullDownButton,
    DeleteChartButton,
    ChartTypeModifier,
    OHLCRecordRangeSelector,
    FunctionsSelector,
  },
  data() {
    return {
      processed_data: null,
      layout: null,
      chartType: "line",
      appliedFunctions: [],
      addedFunction: null,
      ohlcRecordRange: "day",
    };
  },
  props: {
    chart: Object,
  },
  created: function () {
      console.log(this.chart.id)
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
        this.plotLineChart(data);
      } else {
        throw `Unknown chart type - "${this.chartType}".`;
      }
    },
    plotLineChart(data) {
      var trace1 = {
        type: "scatter",
        mode: "lines",
        name: "AAPL High",
        x: data.map((d) => d.date),
        y: data.map((d) => d.price),
        line: { color: "#17BECF" },
      };

      this.processed_data = [trace1];
    },
    plotOHLC(data, chartType) {
      if (!chartType || !["candlestick", "ohlc"].includes(chartType)) {
        throw `Unknown OHLC type - "${chartType}".`;
      }
      const ohlc_data = this.convertToOHLC(data);
      const trace1 = {
        x: ohlc_data.map((item) => item.date),

        close: ohlc_data.map((item) => item.close),

        decreasing: { line: { color: "rgb(255, 51, 0)" } },

        high: ohlc_data.map((item) => item.high),

        increasing: { line: { color: "rgb(77, 255, 195)" } },

        line: { color: "rgba(31,119,180,1)" },

        low: ohlc_data.map((item) => item.low),

        open: ohlc_data.map((item) => item.open),

        type: chartType,
        xaxis: "x",
        yaxis: "y",
      };

      this.processed_data = [trace1];
    },
    changeChartType(chartType) {
      this.chartType = chartType;
      this.plotChart();
    },
    changeOhlcRecordRange(range) {
        this.ohlcRecordRange = range;
        this.plotChart();
    },
    addAnalysingFunction(func) {
      this.appliedFunctions = [...this.appliedFunctions, func];
      console.log(this.appliedFunctions);
    },
  },
  emits: ["delete-chart", "chart-pick-up", "chart-pull-down"],
};
</script>
