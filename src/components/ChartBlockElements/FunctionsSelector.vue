<template>
  <div>
    <b-button v-b-modal.modal-1>Add function</b-button>

    <b-modal
      id="modal-1"
      title="Function selector"
      :ok-disabled="okDisable"
      @ok="emitAddFunction"
    >
      <select v-model="addedFunction">
        <option value="" disabled selected>Select function</option>
        <option :value="fun" :key="fun.type" v-for="fun in analysisFunctions">
          {{ fun.type }}
        </option>
      </select>
      <div v-if="addedFunction">
        <div :key="input.name" v-for="input in addedFunction.inputs">
          <span>{{ input.name }}</span>
          <input
            :min="input.min"
            :max="input.max"
            type="number"
            v-model="args[input.name]"
          />
        </div>
      </div>
      <v-color-picker
        dot-size="25"
        show-swatches
        swatches-max-height="200"
      ></v-color-picker>
      <p class="warningParagraph" v-if="alreadyAppliedMessage">
        Function already applied.
      </p>
    </b-modal>
  </div>
</template>

<style scoped>
.warningParagraph {
  color: red;
}
</style>

<script>
const constants = require("../../../data/constants.json");

export default {
  name: "FunctionsSelector",
  props: {
    appliedFunctions: [],
  },
  data() {
    return {
      analysisFunctions: [],
      functionsSettings: [],
      addedFunction: null,
      args: {},
      okDisable: true,
      alreadyAppliedMessage: false,
    };
  },
  watch: {
    addedFunction: function () {
      this.okDisable = !this.checkArgs();
    },
    args: {
      deep: true,
      handler() {
        this.okDisable = !this.checkArgs();
      },
    },
    appliedFunctions: function () {
      this.okDisable = !this.checkArgs();
    },
  },
  created: function () {
    //TODO: loading analysis functions and their setting from file
    this.analysisFunctions = constants.analysisFunctions;
  },
  methods: {
    funcToString(type, args) {
      let str = type + " (";
      const keys = Object.keys(args);
      for (let i = 0; i < keys.length; i++) {
        str += args[keys[i]];
        if (i < keys.length - 1) {
          str += ", ";
        }
      }
      str += ")";
      return str;
    },
    checkIfAllArgsReady() {
      if (
        !this.addedFunction ||
        (this.addedFunction.inputs &&
          Object.keys(this.args).length !== this.addedFunction.inputs.length)
      ) {
        return false;
      } else {
        return true;
      }
    },
    checkIfAlreadyApplied() {
      const name = this.funcToString(this.addedFunction.type, this.args);
      return this.appliedFunctions.map((func) => func.name).includes(name);
    },
    checkArgs() {
      if (this.checkIfAllArgsReady()) {
        if (this.checkIfAlreadyApplied()) {
          this.alreadyAppliedMessage = true;
          return false;
        } else {
          this.alreadyAppliedMessage = false;
          return true;
        }
      } else {
        return false;
      }
    },
    emitAddFunction() {
      const name = this.funcToString(this.addedFunction.type, this.args);
      const func = {
        name: name,
        type: this.addedFunction.type,
        args: this.args,
      };
      this.$emit("add-analysing-function", func);
      this.addedFunction = null;
      this.args = {};
    },
  },
  emits: ["add-analysing-function"],
};
</script>
