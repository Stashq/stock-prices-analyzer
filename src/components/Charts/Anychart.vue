<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdn.anychart.com/releases/8.3.0/css/anychart-ui.min.css"
    />
    <div id="container"></div>
  </div>
</template>

<style scoped>
#container {
  height: 350px;
}
</style>



<script>
function styleChart(anychart) {
  function a() {
    return window.anychart.color.setOpacity(this.sourceColor, 0.5, !0);
  }
  function b() {
    return window.anychart.color.lighten(this.sourceColor);
  }
  var d = {
    palette: {
      type: "distinct",
      items:
        "#40c4ff #0288d1 #9fa8da #5c6bc0 #7e57c2 #54dbdf #15a9c7 #00897b #304ffe #0179be".split(
          " "
        ),
    },
    defaultOrdinalColorScale: {
      autoColors: function (c) {
        return window.anychart.color.blendedHueProgression(
          "#40c4ff",
          "#0179be",
          c
        );
      },
    },
    defaultLinearColorScale: { colors: ["#40c4ff", "#0179be"] },
    defaultFontSettings: {
      fontFamily: '"Lucida Console", Monaco, monospace',
      fontColor: "#b0bec5",
      fontSize: 12,
    },
    defaultBackground: {
      fill: "#37474f",
      stroke: "#263238",
      cornerType: "round",
      corners: 0,
    },
    defaultAxis: {
      stroke: "#546e7a",
      ticks: { stroke: "#546e7a" },
      minorTicks: { stroke: "#455a64" },
    },
    defaultGridSettings: { stroke: "#546e7a" },
    defaultMinorGridSettings: { stroke: "#455a64" },
    defaultSeparator: { fill: "#546e7a" },
    defaultTooltip: {
      background: { fill: "#37474f 0.9", corners: 3 },
      fontColor: "#90a4ae",
      fontSize: 12,
      title: { align: "center", fontSize: 14, fontColor: "#90a4ae" },
      padding: { top: 10, right: 15, bottom: 10, left: 15 },
      separator: { margin: { top: 10, right: 10, bottom: 10, left: 10 } },
    },
    defaultColorRange: {
      stroke: "#546e7a",
      ticks: { stroke: "#546e7a", position: "outside", length: 7, enabled: !0 },
      minorTicks: {
        stroke: "#546e7a",
        position: "outside",
        length: 5,
        enabled: !0,
      },
      marker: {
        padding: { top: 3, right: 3, bottom: 3, left: 3 },
        fill: "#b0bec5",
      },
    },
    defaultScroller: {
      fill: "#455a64",
      selectedFill: "#546e7a",
      thumbs: {
        fill: "#78909c",
        stroke: "#455a64",
        hovered: { fill: "#90a4ae", stroke: "#546e7a" },
      },
    },
    defaultLegend: { paginator: { fontColor: "#b0bec5" } },
    chart: {
      defaultSeriesSettings: {
        base: {
          selected: {
            stroke: "1.5 #878f96",
            markers: { stroke: "1.5 #878f96" },
          },
        },
        lineLike: { selected: { stroke: "3 #878f96" } },
        areaLike: { selected: { stroke: "3 #878f96" } },
        marker: { selected: { stroke: "1.5 #878f96" } },
        candlestick: {
          normal: {
            risingFill: "#0179be",
            risingStroke: "#0179be",
            fallingFill: "#40c4ff",
            fallingStroke: "#40c4ff",
          },
          hovered: {
            risingFill: b,
            risingStroke: function () {
              return window.anychart.color.darken(this.sourceColor);
            },
            fallingFill: b,
            fallingStroke: b,
          },
          selected: {
            risingStroke: "3 #0179be",
            fallingStroke: "3 #40c4ff",
            risingFill: "#333333 0.85",
            fallingFill: "#333333 0.85",
          },
        },
        ohlc: {
          normal: { risingStroke: "#0179be", fallingStroke: "#40c4ff" },
          hovered: { risingStroke: b, fallingStroke: b },
          selected: { risingStroke: "3 #0179be", fallingStroke: "3 #40c4ff" },
        },
      },
      title: { fontSize: 14 },
      padding: { top: 20, right: 25, bottom: 15, left: 15 },
    },
    cartesianBase: {
      defaultSeriesSettings: {
        box: {
          selected: {
            medianStroke: "#878f96",
            stemStroke: "#878f96",
            whiskerStroke: "#878f96",
            outlierMarkers: {
              enabled: null,
              size: 4,
              fill: "#878f96",
              stroke: "#878f96",
            },
          },
        },
      },
    },
    pieFunnelPyramidBase: {
      normal: { labels: { fontColor: null } },
      selected: { stroke: "1.5 #878f96" },
      connectorStroke: "#546e7a",
      outsideLabels: { autoColor: "#b0bec5" },
      insideLabels: { autoColor: "#212121" },
    },
    pie: { selected: { stroke: "1.5 #878f96" } },
    map: {
      unboundRegions: { enabled: !0, fill: "#455a64", stroke: "#546e7a" },
      defaultSeriesSettings: {
        base: {
          normal: { labels: { fontColor: "#212121" } },
          selected: { stroke: "3 #878f96" },
        },
        connector: {
          normal: { markers: { stroke: "1.5 #455a64" } },
          hovered: { markers: { stroke: "1.5 #455a64" } },
          selected: {
            stroke: "1.5 #000",
            markers: { stroke: "1.5 #455a64", fill: "#000" },
          },
        },
        bubble: { normal: { stroke: b } },
        marker: { normal: { labels: { fontColor: "#b0bec5" } } },
      },
    },
    sparkline: {
      padding: 0,
      background: { stroke: "#37474f" },
      defaultSeriesSettings: {
        area: { stroke: "1.5 #40c4ff", fill: "#40c4ff 0.5" },
        column: { fill: "#40c4ff", negativeFill: "#0179be" },
        line: { stroke: "1.5 #40c4ff" },
        winLoss: { fill: "#40c4ff", negativeFill: "#0179be" },
      },
    },
    bullet: {
      background: { stroke: "#37474f" },
      padding: { top: 5, right: 10, bottom: 5, left: 10 },
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      defaultMarkerSettings: { fill: "#40c4ff", stroke: "2 #40c4ff" },
      rangePalette: {
        items: ["#b0bec5", "#90a4ae", "#78909c", "#546e7a", "#455a64"],
      },
    },
    heatMap: {
      normal: { stroke: "#37474f", labels: { fontColor: "#212121" } },
      hovered: { stroke: "1.5 #37474f" },
      selected: { stroke: "1.5 #878f96" },
    },
    treeMap: {
      normal: {
        headers: {
          background: { enabled: !0, fill: "#455a64", stroke: "#546e7a" },
        },
        labels: { fontColor: "#212121" },
        stroke: "#546e7a",
      },
      hovered: {
        headers: {
          fontColor: "#b0bec5",
          background: { fill: "#546e7a", stroke: "#546e7a" },
        },
      },
      selected: { labels: { fontColor: "#fafafa" }, stroke: "2 #878f96" },
    },
    stock: {
      padding: [20, 30, 20, 60],
      defaultPlotSettings: {
        xAxis: { background: { fill: "#455a64 0.3", stroke: "#546e7a" } },
      },
      scroller: {
        fill: "none",
        selectedFill: "#455a64 0.3",
        outlineStroke: "#546e7a",
        defaultSeriesSettings: {
          base: {
            normal: { fill: "#999 0.6", stroke: "#999 0.6" },
            selected: { fill: a, stroke: a },
          },
          lineLike: { selected: { stroke: a } },
          areaLike: { selected: { stroke: a } },
          marker: { selected: { stroke: a } },
          candlestick: {
            normal: {
              risingFill: "#999 0.6",
              risingStroke: "#999 0.6",
              fallingFill: "#999 0.6",
              fallingStroke: "#999 0.6",
            },
            selected: {
              risingStroke: a,
              fallingStroke: a,
              risingFill: a,
              fallingFill: a,
            },
          },
          ohlc: {
            normal: { risingStroke: "#999 0.6", fallingStroke: "#999 0.6" },
            selected: { risingStroke: a, fallingStroke: a },
          },
        },
      },
    },
  };
  anychart = window.anychart || {};
  anychart.themes = window.anychart.themes || {};
  anychart.themes.darkBlue = d;
}

import Anychart from "anychart";

export default {
  props: ["options", "Anychart"],
  name: "VueAnychart",

  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    Anychart.onDocumentReady(function () {
      Anychart.data.loadCsvFile(
        // The data used in this sample can be obtained from the CDN
        "https://cdn.anychart.com/csv-data/orcl-daily-short-data(2011-2016).csv",
        function (data) {
          // create data table on loaded data
          var dataTable = Anychart.data.table();
          dataTable.addData(data);

          // map loaded data for the ohlc series
          var mapping = dataTable.mapAs({
            open: 1,
            high: 2,
            low: 3,
            close: 4,
          });

          // map loaded data for the scroller
          var scrollerMapping = dataTable.mapAs();
          scrollerMapping.addField("value", 5);

          //   Anychart.theme(Anychart.themes.coffee);
          styleChart(Anychart);
          // create stock chart
          var chart = Anychart.stock();

          // set chart title
          chart.title("Anychart");

          // set chart padding
          chart.padding([15, 50, 57, 50]);

          // create plot on the chart
          var plot = chart.plot();
          plot.yGrid(true).yMinorGrid(true);

          var series = plot.ohlc(mapping).name("CSCO");
          series.legendItem().iconType("rising-falling");

          // create annotation
          var annotation = plot.annotations();
          // create line annotation
          annotation.line({
            // X - part of the first anchor
            xAnchor: "2011-01-02",
            // Y - part of the first anchor
            valueAnchor: 11.5,
            // X - part of the second anchor
            secondXAnchor: "2011-08-07",
            // Y - part of the second anchor
            secondValueAnchor: 9,
            stroke: "2 #DD3F2A",
            // set hover stroke settings
            hovered: {
              stroke: "2 #DD3F2A",
            },
          });
          // create horizontalLine annotation
          annotation.horizontalLine({
            // X - part of the first anchor
            xAnchor: "2011-01-02",
            // Y - part of the first anchor
            valueAnchor: 16,
            // X - part of the second anchor
            secondXAnchor: "2016-06-12",
            // Y - part of the second anchor
            secondValueAnchor: 16,
            // set stroke settings
            stroke: {
              thickness: 2,
              color: "#60727B",
              dash: "10 15",
            },
            // set hover stroke settings
            hovered: {
              stroke: {
                thickness: 2,
                color: "#60727B",
                dash: "10 15",
              },
            },
          });
          // create finiteTrendChannel annotation
          annotation.finiteTrendChannel({
            // X - part of the first anchor
            xAnchor: "2011-08-07",
            // Y - part of the first anchor
            valueAnchor: 9,
            // X - part of the second anchor
            secondXAnchor: "2015-01-04",
            // Y - part of the second anchor
            secondValueAnchor: 19,
            // width of the trend channel
            channelWidth: 6,
            // set stroke settings
            stroke: "2 #6E9C4E",
            // set fill settings
            fill: "#6E9C4E 0.3",
            // set hover fill/stroke settings
            hovered: {
              fill: "#6E9C4E 0.2",
              stroke: "2 #6E9C4E",
            },
          });

          chart.background().fill({
            color: "rgba(0,0,0,0)",
            mode: "fit",
          });
          // create scroller series with mapped data
          chart.scroller().ohlc(mapping);
          // set container id for the chart
          chart.container("container");
          // initiate chart drawing
          chart.draw();

          // create range picker
          var rangePicker = Anychart.ui.rangePicker();
          // init range picker
          rangePicker.render(chart);

          // create range selector
          var rangeSelector = Anychart.ui.rangeSelector();
          // init range selector
          rangeSelector.render(chart);
        }
      );
    });
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },
};
</script>
