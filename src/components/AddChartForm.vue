<template>
  <div class="form-container">
    <form
      id="addChart"
      @submit.prevent="$emit('add-chart', start_date, end_date, selected_commodity)"
    >
      <div class="variable-row-container">
        <span class="variable-name-span">Start date</span>
        <div class="inputs-container">
          <b-form-datepicker
            v-model="start_date"
            @input="validateInput"
            :max="end_date"
            locale="en"
            class="form-el"
          ></b-form-datepicker>
        </div>
      </div>
      <div class="variable-row-container">
        <span class="variable-name-span">End date</span>
        <div class="inputs-container">
          <b-form-datepicker
            v-model="end_date"
            @input="validateInput"
            :min="start_date"
            locale="en"
            class="form-el"
          ></b-form-datepicker>
        </div>
      </div>
      <div class="variable-row-container">
        <span class="variable-name-span">Commodity</span>
        <div class="inputs-container">
          <select
            v-model="selected_commodity"
            @change="validateInput"
            class="form-el select-commodity"
          >
            <option value="" disabled selected>Select commodity</option>
            <option :key="commodity" v-for="commodity in available_commodities">
              {{ commodity }}
            </option>
          </select>
        </div>
      </div>
      <button
        :disabled="isDisabled"
        type="submit"
        class="form-el btn-plot-adder"
      >
        <b-icon class="plus-icon" icon="plus-square" /> Submit
      </button>
    </form>
  </div>
</template>


<style scoped>
.form-container {
  margin: auto;
  border-radius: 25px;
  padding: 10px;
  background-color: #6d379969;
  color: white;
  width: 45%;
}

.form-el {
  margin: 10px;
  border-radius: 5px;
}

.btn-plot-adder {
  display: block;
  margin: auto;
  border: 0px;
  background-color: #ffffff;
  padding: 1px;
  height: 36px;
  width: 33%;
}

.select-commodity {
  width: 100%;
  padding: 1px;
  height: 36px;
  background-color: #ffffff;
}

.variable-row-container {
  width: 90%;
  margin: 10px 0px 5px 0px;

  display: inline-flex;
  align-items: center;
}

.inputs-container {
  width: 35%;
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
  width: 50%;
  text-align: right;
}

b-form-datepicker {
  margin: 0px 10px;
  border-radius: 5px;
  border: 0px;
  padding: 1px;
  height: 40px;
  width: 25%;
  overflow: hidden;
  font-size: 20px;
  text-align-last: center;
}
</style>

<script>
export default {
  name: "AddChartForm",
  props: {
    available_commodities: [],
  },
  data() {
    return {
      start_date: null,
      end_date: null,
      selected_commodity: null,
      isDisabled: true,
    };
  },
  methods: {
    validateInput() {
      if (this.start_date && this.end_date && this.selected_commodity) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
  },
  emits: ["add-chart"],
};
</script>
