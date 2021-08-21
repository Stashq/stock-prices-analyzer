<template>
  <div class="dashboard-container">
    <!-- <form
      id="addChart"
      @submit.prevent="$emit('add-chart', start_date, end_date, selected_grain)"
    > -->
    <form
      id="addChart"
      @submit.prevent="$emit('add-chart', '2020-01-01T00:00:00+0000', '2021-01-01T00:00:00+0000', 'oats')"
    >
      <div class="form-block">
        <h2>Start date</h2>
        <b-form-datepicker
          v-model="start_date"
          @input="validateInput"
          :max="end_date"
          locale="en"
          class="form-el"
        ></b-form-datepicker>
      </div>
      <div class="form-block">
        <h2>End date</h2>
        <b-form-datepicker
          v-model="end_date"
          @input="validateInput"
          :min="start_date"
          locale="en"
          class="form-el"
        ></b-form-datepicker>
      </div>
      <div class="form-block">
        <h2>Grain</h2>
        <select
          v-model="selected_grain"
          @change="validateInput"
          class="form-el select-grain"
        >
          <option value="" disabled selected>Select grain</option>
          <option :key="grain" v-for="grain in available_grains">
            {{ grain }}
          </option>
        </select>
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
.dashboard-container {
  border-radius: 25px;
  padding: 10px;
  background-color: #6d379969;
  margin: 10px 10%;
  color: white;
}

.form-block {
  display: inline-block;
  margin: 0px 2%;
  width: 25%;
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

.select-grain {
  width: 100%;
  padding: 1px;
  height: 36px;
  background-color: #ffffff;
}
</style>

<script>
export default {
  name: "AddPlotBtn",
  props: {
    available_grains: [],
  },
  data() {
    return {
      start_date: null,
      end_date: null,
      selected_grain: null,
    //   isDisabled: true,
      isDisabled: false,
    };
  },
  methods: {
    validateInput() {
      if (this.start_date && this.end_date && this.selected_grain) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
  },
  emits: ["add-chart"],
};
</script>

