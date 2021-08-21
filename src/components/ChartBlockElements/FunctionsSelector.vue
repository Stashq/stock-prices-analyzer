<template>
  <div>
    <b-button v-b-modal="chart_id.toString(2)">Add function</b-button>

    <b-modal
      :id="chart_id.toString(2)"
      title="Function selector"
      :ok-disabled="okDisable"
      @ok="emitAddFunction"
    >
      <div class="modal-el">
        <span class="modal-el-span">Choose color</span>
        <div class="color-picker">
          <color-picker v-model="color" @afterChange="wasColorAlreadyPicked">
          </color-picker>
        </div>
      </div>

      <div class="modal-el">
        <span class="modal-el-span">Select function</span>
        <select class="modal-input" v-model="addedFunction">
          <option value="" disabled selected>Select function</option>
          <option :value="fun" :key="fun.type" v-for="fun in analysisFunctions">
            {{ fun.type }}
          </option>
        </select>
      </div>

      <div v-if="addedFunction">
        <div
          class="modal-el"
          :key="input.name"
          v-for="input in addedFunction.inputs"
        >
          <span class="modal-el-span">{{ input.name }}</span>
          <input
            class="modal-input"
            :min="input.min"
            :max="input.max"
            type="number"
            v-model="args[input.name]"
          />
        </div>
      </div>
      <p class="warningParagraph">
        {{ this.errorMessage }}
      </p>
    </b-modal>
  </div>
</template>

<style scoped>
.warningParagraph {
  color: red;
}

.modal-input {
  height: 35px;
  width: 50%;
}

.modal-el {
  margin: 10px;
  height: 40px;
  border-color: black;
}

.modal-el-span {
  display: inline-block;
  width: 200px;
  text-transform: capitalize;
}

.color-picker {
  margin: 5px;
  border: 3px;
  display: inline-block;
}
</style>

<script>
const constants = require("../../../data/constants.json");

export default {
  name: "FunctionsSelector",
  props: {
    chart_id: Number,
    appliedFunctions: Array,
  },
  data() {
    return {
      analysisFunctions: [],
      addedFunction: null,
      args: {},
      errorMessage: null,
      okDisable: true,
      alreadyAppliedMessage: false,
      color: "#3C85C9",
    };
  },
  watch: {
    addedFunction: function() {
      this.okDisable = !this.checkArgs();
    },
    args: {
      deep: true,
      handler() {
        this.okDisable = !this.checkArgs();
      },
    },
    color: function() {
      this.okDisable = !this.checkArgs();
    },
    appliedFunctions: function() {
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
    checkIfFuncAlreadyApplied() {
      const name = this.funcToString(this.addedFunction.type, this.args);
      return this.appliedFunctions.map((func) => func.name).includes(name);
    },
    checkArgs() {
      let argsOk = true;
      if (this.checkIfAllArgsReady()) {
        if (this.wasColorAlreadyPicked()) {
          this.errorMessage = "Color already picked.";
          argsOk = false;
        } else if (this.checkIfFuncAlreadyApplied()) {
          this.errorMessage = "Function already applied.";
          argsOk = false;
        } else {
          this.errorMessage = null;
        }
      } else {
        argsOk = false;
      }
      return argsOk;
    },
    emitAddFunction() {
      const name = this.funcToString(this.addedFunction.type, this.args);
      const func = {
        name: name,
        type: this.addedFunction.type,
        args: this.args,
        color: this.color,
      };
      this.$emit("add-analysing-function", func);
      this.addedFunction = null;
      this.args = {};
    },
    wasColorAlreadyPicked() {
      const colors = this.appliedFunctions
        .map((func) => func.color)

        return colors.includes(this.color);
    },
  },
  emits: ["add-analysing-function"],
};
</script>
