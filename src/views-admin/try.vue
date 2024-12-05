<template>
  <div>
    <v-chart
      :options="chartOptions"
      style="width: 600px; height: 400px"
    ></v-chart>
  </div>
</template>

<script>
export default {
  name: "tryPage",
  data() {
    return {
      chartOptions: {
        title: {
          text: "測試柱狀圖",
        },
        tooltip: {},
        xAxis: {
          data: ["A", "B", "C", "D", "E"],
        },
        yAxis: {},
        series: [
          {
            name: "銷售量",
            type: "bar",
            data: [5, 20, 36, 10, 10],
          },
        ],
      },
    };
  },
};
</script>
