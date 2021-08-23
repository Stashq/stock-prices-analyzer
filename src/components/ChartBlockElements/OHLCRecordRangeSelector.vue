<template>
  <div class="variable-row-container">
    <span class="variable-name-span">Record range</span>
    <div class="inputs-container">
      <select
        v-model="recordRange"
        @change="$emit('ohlc-record-range-changed', recordRange)"
      >
        <option value="" disabled selected>Select candlestick range</option>
        <option :key="range" v-for="range in ranges">
          {{ range }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.variable-row-container {
  width: 80%;
  margin: 10px 0px 5px 0px;

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

select {
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
  name: "OHLCRecordRangeSelector",
  data() {
    return {
      ranges: ["Year", "Month", "Day", "Hour", "Minute"],
      recordRange: "day",
    };
  },
  emits: ["ohlc-record-range-changed"],
};
</script>
