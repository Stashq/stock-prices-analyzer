<template>
  <div class="variable-row-container">
    <span class="variable-name-span">Chart type</span>
    <div class="inputs-container">
      <button @click="$emit('change-chart-type', 'line')">Line</button>
      <button @click="$emit('change-chart-type', 'ohlc')">OHLC</button>
      <button @click="$emit('change-chart-type', 'candlestick')">
        Candlestick
      </button>
    </div>
  </div>
</template>

<style scoped>
.variable-row-container {
  width: 80%;
  margin: 5px 0px;

  display: inline-flex;
  /* center items horizontally */
  align-items: center;
}

.inputs-container {
  width: 50%;
  text-align: left;
}

.variable-name-span {
  display: inline;
  color: white;
  font-size: 40px;
  height: 45px;
  position: relative;
  top: -10px;
  left: -20px;
  width: 30%;
  text-align: right;
}

button {
  margin: 0px 10px;
  border-radius: 5px;
  border: 0px;
  padding: 1px;
  height: 40px;
  width: 25%;
  background-color: #b44b4b;
  color: white;
  overflow: hidden;
  font-size: 20px;
}
</style>

<script>
export default {
  name: "ChartTypeModifier",
  data() {
    return {
      ranges: ["year", "month", "day", "hour", "minute"],
      groupBy: "month",
    };
  },
  emits: ["change-chart-type", "plot-chart"],
};
</script>
