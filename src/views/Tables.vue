<template>
  <div>
    <Navbar @sing-out="singOut()" />
    <Sidebar />
    <main>
      <div
        class="custom-file-upload"
        :style="inputFileBlockStyle"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
      >
        <span class="drag-file-span"
          ><b-icon icon="file-diff-fill" />Click or drop file to send file
        </span>
        <input
          type="file"
          title=" "
          @change="sendFile"
          accept=".csv"
          class="file-input"
        />
      </div>
      <div
        class="commodities-item"
        :key="commodity['_measurement']"
        v-for="commodity in commodities"
      >
        <h1 class="commodity-name">{{ commodity["_measurement"] }}</h1>
        <div class="commodity-params">
          <div class="param-block">
            <span class="variable-name-span">Start</span>
            <span class="variable-value">
              {{ commodity["first_time"].slice(0, 10) }}:
              {{ commodity["first_value"] }}
            </span>
          </div>
          <div class="param-block">
            <span class="variable-name-span">End</span>
            <span class="variable-value">
              {{ commodity["last_time"].slice(0, 10) }}:
              {{ commodity["last_value"] }}
            </span>
          </div>
          <div class="param-block">
            <span class="variable-name-span">Mean</span>
            <span class="variable-value">
              {{ commodity["mean"].toPrecision(4) }}
            </span>
          </div>
          <div class="param-block">
            <span class="variable-name-span">Std dev</span>
            <span class="variable-value">
              {{ commodity["stddev"].toPrecision(4) }}
            </span>
          </div>
          <div class="param-block">
            <span class="variable-name-span">Count</span>
            <span class="variable-value">{{ commodity["count"] }}</span>
          </div>
        </div>
        <div class="btns-block">
          <button
            @click="downloadCommodity(commodity['_measurement'])"
            style="margin-right: 2%"
            class="commodity-control-btn"
          >
            <b-icon icon="file-earmark-arrow-down-fill" />
            <span>Download</span>
          </button>
          <b-button
            v-b-modal.modal-delete
            style="margin-left: 2%"
            class="commodity-control-btn"
            @click="deletedMeasurement = commodity"
          >
            <b-icon icon="trash-fill" />
            <span>Delete</span>
          </b-button>
        </div>
      </div>

      <b-modal
        id="modal-delete"
        :ok-disabled="okDisable"
        @ok="deleteMeasurementFromDatabases"
        @cancel="clearInput"
        :title="'Delete ' + deletedMeasurementName"
      >
        <p>If you sure you want to delete this time series, pass its name.</p>
        <input
          type="text"
          :placeholder="deletedMeasurementName"
          v-model="inputMeasurementDelete"
        />
        <p class="delete-warning">
          Be aware that deleting might take few minutes. During process, removed
          data can be still avaible.
        </p>
      </b-modal>
    </main>
  </div>
</template>

<style scoped>
/* modal block */
.delete-warning {
  margin: 10px 0px;
  color: #d69c13;
}

/* commodity block */

.commodities-item {
  display: inline-block;
  width: 400px;
  padding: 10px;
  margin: 20px 2%;
  border-radius: 25px;
  color: white;
  background-color: #535dcf57;
  overflow: hidden;
}

.commodity-name {
  border-radius: 15px;
  background-color: #64077769;
  overflow: hidden;
}

.commodity-params {
  overflow: hidden;
  border-radius: 20px;
  background-color: #b84f1f69;
  padding: 5px;
}

.param-block {
  display: flex;
  align-items: center;
}

.variable-name-span {
  display: inline-block;
  font-size: 24px;
  height: 45px;
  position: relative;
  width: 30%;
  padding: 0 3%;
  text-align: right;
  overflow: hidden;
}

.variable-value {
  display: inline-block;
  width: 60%;
  text-align: center;
  font-size: 20px;
  overflow: hidden;
  position: relative;
  top: -5px;
}

/* Commodity control buttons */

.btns-block {
  display: inline-flex;
  align-items: center;
  margin: 10px 0px;
  width: 100%;
}

.commodity-control-btn {
  border-radius: 10px;
  border: 0px;
  padding: 1px;
  height: 80px;
  width: 48%;
  background-color: #b44b4b;
  color: white;
  overflow: hidden;
  font-size: 20px;
  transition: 0.4s;
}

.commodity-control-btn:hover {
  background-color: #d35757;
}

.commodity-control-btn:active {
  background-color: rgb(146, 61, 61);
}

/* Add file */

.drag-file-span {
  z-index: 0;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 30px;
}

.file-input {
  margin: auto;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  text-align: center;
  width: 100%;
  height: 100%;
  z-index: 1;
}
input[type="file"] {
  opacity: 0;
}
.custom-file-upload {
  margin: auto;
  background-color: #b44b4b;
  border-radius: 25px;
  overflow: hidden;
  width: 95%;
  min-width: 400px;
  height: 250px;
  position: relative;
  border: 2px solid rgb(226, 226, 226);
  transition: 0.4s;
}

main {
  margin-left: 290px;
}
</style>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";

const constants = require("../../data/constants.json");

export default {
  components: {
    Navbar,
    Sidebar,
  },
  data() {
    return {
      commodities: [],
      okDisable: true,
      deletedMeasurementName: null,
      deletedMeasurement: undefined,
      inputMeasurementDelete: null,
      inputFileBlockStyle: {
        "background-color": "#b44b4b",
        border: "2px solid rgb(226, 226, 226)",
      },
    };
  },
  watch: {
    deletedMeasurement() {
      if (this.deletedMeasurement) {
        this.deletedMeasurementName = this.deletedMeasurement["_measurement"];
      } else {
        this.deletedMeasurement = null;
      }
    },
    inputMeasurementDelete() {
      if (this.inputMeasurementDelete === this.deletedMeasurementName) {
        this.okDisable = false;
      } else {
        this.okDisable = true;
      }
    },
  },
  created: function () {
    this.$api
      .get("/commodities/all/infos", {
        params: {
          start_date: constants.min_date,
          end_date: constants.max_date,
        },
      })
      .then((res) => {
        this.commodities = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    clearInput() {
      this.inputMeasurementDelete = null;
      this.deletedMeasurement = undefined;
      this.deletedMeasurementName = null;
    },
    deleteMeasurementFromDatabases() {
      this.$api
        .delete("/commodities/" + this.deletedMeasurement["_measurement"], {
          params: {
            start_date: this.deletedMeasurement["first_time"],
            end_date: this.deletedMeasurement["last_time"],
          },
        })
        .then(() => {
          this.commodities = this.commodities.filter(
            (commodity) =>
              commodity["_measurement"] !==
              this.deletedMeasurement["_measurement"]
          );
          alert(
            "Commodity " + this.deletedMeasurementName + " deleted successful."
          );
          this.clearInput();
        })
        .catch((err) => {
          if (err.response.status == 400) {
            alert(
              err.response.data.detail +
                ". Perhaps deleted data that already has been removed."
            );
          }
        });
    },
    async downloadCommodity(commodity) {
      this.$api
        .get(`/commodities/${commodity}`, {
          params: {
            start_date: constants.min_date,
            end_date: constants.max_date,
          },
        })
        .then((res) => {
          let data = res.data[commodity];

          data =
            "date,price\n" +
            data.map((el) => el.date + "," + el.price.toString()).join("\n");
          const fileName =
            commodity +
            "_" +
            constants.min_date +
            "_" +
            constants.max_date +
            ".csv";

          var file = new Blob([data], { type: "csv" });
          if (window.navigator.msSaveOrOpenBlob)
            // IE10+
            window.navigator.msSaveOrOpenBlob(file, fileName);
          else {
            // Others
            var a = document.createElement("a"),
              url = URL.createObjectURL(file);
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
            }, 0);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    sendFile(e) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      console.log(e);
      this.$api
        .post("/commodities", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          alert("File " + e.target.files[0].name + " sent successful.");
        })
        .catch(() => {
          alert("File " + e.target.files[0].name + " rejected.");
        });
    },
    dragover(event) {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      this.inputFileBlockStyle = {
        "background-color": "#d35757",
        border: "2px solid rgb(240, 240, 240)",
      }
    },
    dragleave() {
      // Clean up
      this.inputFileBlockStyle = {
        "background-color": "#b44b4b",
        border: "2px solid rgb(226, 226, 226)",
      }
    },
    drop(event) {
      event.preventDefault();
      this.sendFile(event); // Trigger the onChange event manually
      // Clean up
      this.inputFileBlockStyle = {
        "background-color": "#b44b4b",
        border: "2px solid rgb(226, 226, 226)",
      }
    },
  },
};
</script>
