<template>
  <div>
    <Navbar />
    <Sidebar />
    <main>
      <div class="chart dashboard-container">
        <button type="button" class="btn-plot-up">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-compact-up"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"
            />
          </svg>
        </button>
        <Plotly />

        <button type="button" class="btn-plot-up">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-compact-down"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
            />
          </svg>
        </button>
      </div>
      <div class="dashboard-container">
        <button type="button" class="btn-plot-adder">
          <b-icon class="plus-icon" icon="plus-square" />
        </button>
      </div>
      <!-- <Anychart /> -->
      <!-- <Chart /> -->
    </main>
  </div>
</template>

<style scoped>
main {
  margin-left: 290px;
}

.bi-chevron-compact-up .bi-chevron-compact-down {
  transform: scale(2.5, 1.5);
  color: white;
}

.plus-icon {
  color: white;
}

.dashboard-container {
  margin: 10px 30px 10px 30px;
  border-radius: 25px;
}

.chart {
  padding-right: 20px;
  background-color: #6d379969;
  overflow: hidden;
  position: relative;
}

.btn-plot-up {
  width: calc(100% + 20px);
  background-color: #64077769;
  border: 0px;
}

.btn-plot-adder {
  display: block;
  width: 100%;
  border-radius: 25px;
  border: 0px;
  background-color: #64077769;
}
</style>

<script>
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
// import Chart from "../components//Charts/ChartJS.vue";
// import Anychart from "../components/Charts/Anychart.vue";
import PlotlyChart from "../components/Charts/Plotly.vue";

export default {
  components: {
    Navbar: Navbar,
    Sidebar: Sidebar,
    // Chart: Chart,
    // Anychart: Anychart,
    Plotly: PlotlyChart,
  },
  data() {
    return {
      data: [
        {
          x: [1, 2, 3, 4],
          y: [10, 15, 13, 17],
          type: "scatter",
        },
      ],
      layout: {
        title: "My graph",
      },
    };
  },
};
</script>
