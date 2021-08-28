<template>
  <div class="selects-block">
    <div class="inputs-container">
      <select
        v-model="selectedChartType"
        @change="$emit('change-chart-type', selectedChartType)"
      >
        <option value="" disabled selected>Select type</option>
        <option :key="chartType" v-for="chartType in chartTypes">
          {{ chartType }}
        </option>
      </select>
    </div>

    <div class="inputs-container">
      <select
        v-model="selectedRecordRange"
        @change="$emit('ohlc-record-range-changed', selectedRecordRange)"
      >
        <option value="" disabled selected>Select record range</option>
        <option :key="range" v-for="range in ranges">
          {{ range }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.selects-block {
    position: absolute;
    right: 20px;
    top: -5px;
    z-index: 10;
}

.inputs-container {
  margin: 10px auto;
  display: inline-block;
}

select {
  margin: 0px 10px;
  border-radius: 5px;
  border: 0px;
  padding: 1px;
  width: 150px;
  background-color: #b44b4b;
  color: white;
  overflow: hidden;
  font-size: 20px;
  text-align-last: center;
}

option:disabled {
  color: rgb(241, 241, 241);
  background-color: #9b4141;
}
</style>

<script>
import constants from "../../../data/constants.json";

export default {
  name: "SelectsBlock",
  data() {
    return {
      ranges: [],
      chartTypes: [],
      selectedChartType: null,
      selectedRecordRange: null,
    };
  },
  props: {
    chartType: String,
    recordRange: String,
  },
  created() {
    this.ranges = constants["record_ranges"];
    this.chartTypes = constants["chart_types"];
    this.selectedChartType = this.chartType;
    this.selectedRecordRange = this.recordRange;
  },
  emits: ["ohlc-record-range-changed", "change-chart-type"],
};
</script>
