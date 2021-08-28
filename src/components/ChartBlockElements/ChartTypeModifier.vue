<template>
  <div class="inputs-container">
    <!-- <select
      v-model="selectedChartType"
      @change="$emit('change-chart-type', selectedChartType)"
    >
      <option value="" disabled selected>Select type</option>
      <option :key="chartType" v-for="chartType in chartTypes">
        {{ chartType }}
      </option>
    </select> -->
  </div>
</template>

<style scoped>

.inputs-container {
  margin: 10px auto;
  display: inline-block;
}

select {
  margin: 0px 10px;
  border-radius: 5px;
  border: 0px;
  padding: 1px;
  height: 40px;
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
  name: "ChartTypeModifier",
  data() {
    return {
      ranges: ["year", "month", "day", "hour", "minute"],
      groupBy: "month",
      chartTypes: [],
      selectedChartType: null,
    };
  },
  props: {
    chartType: String,
  },
  created() {
    this.chartTypes = constants["chart_types"];
    this.selectedChartType = this.chartType;
  },
  emits: ["change-chart-type"],
};
</script>
