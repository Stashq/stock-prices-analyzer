<template>
  <div>
    <button @click="$emit('change-chart-type', 'line')">Line</button>
    <button @click="$emit('change-chart-type', 'ohlc')">OHLC</button>
    <button @click="$emit('change-chart-type', 'candlestick')">
      Candlestick
    </button>
  </div>
</template>

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
