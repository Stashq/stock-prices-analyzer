<template>
  <select v-model="recordRange" @change="$emit('ohlc-record-range-changed', recordRange)">
    <option value="" disabled selected>Select candlestick range</option>
    <option :key="range" v-for="range in ranges">
      {{ range }}
    </option>
  </select>
</template>

<script>
export default {
  name: "OHLCRecordRangeSelector",
  data() {
    return {
      ranges: ["year", "month", "day", "hour", "minute"],
      recordRange: "day",
    };
  },
  emits: ["ohlc-record-range-changed"],
};
</script>
