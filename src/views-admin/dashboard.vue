<template>
  <div class="dashboard">
    <!-- 頂部數據概覽區 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="data-card">
            <i class="el-icon-user" style="font-size: 24px"></i>
            <div class="data-content">
              <h3>{{ totalMembers }}</h3>
              <p>會員總數</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="data-card">
            <i class="el-icon-document" style="font-size: 24px"></i>
            <div class="data-content">
              <h3>{{ totalOrders }}</h3>
              <p>訂單總數</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="data-card">
            <i class="el-icon-goods" style="font-size: 24px"></i>
            <div class="data-content">
              <h3>{{ totalProducts }}</h3>
              <p>商品總數</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 中間圖表展示區 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="16">
        <el-card shadow="hover" class="trend">
          <v-chart
            :options="salesTrendOptions"
            style="width: 100%; height: 400px"
          />
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="開始日期"
            end-placeholder="結束日期"
            align="right"
            :picker-options="pickerOptions"
            @change="getSalesTrend"
          />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <v-chart
            :options="productSalesOptions"
            style="width: 100%; height: 400px"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getSalesTrendAPI, getSalesRankingAPI } from "@/api/order";
export default {
  name: "DashboardPage",
  data() {
    // 定義日期範圍
    const endDate = new Date(); // 設定今天的日期為結束日期
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6); // 將開始日期設置為 6 天前（即近 7 天）

    return {
      // 數據概覽區的數據
      totalMembers: 1200,
      totalOrders: 540,
      totalProducts: 300,

      dateRange: [startDate, endDate], // 預設為最近 7 天

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      // 銷售趨勢圖表選項
      salesTrendOptions: {
        title: {
          text: "銷售趨勢",
        },
        tooltip: {
          trigger: "axis",
          formatter: (params) => {
            const totalSales = params[0].data;
            return `${
              params[0].axisValueLabel
            }: ${totalSales.toLocaleString()}`;
          },
        },
        legend: {
          data: ["銷售額"],
        },
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: (value) => `${value.toLocaleString()}`,
          },
        },
        series: [
          {
            name: "銷售額",
            type: "line",
            data: [],
          },
        ],
      },

      // 商品銷售排行圖表選項
      productSalesOptions: {
        title: {
          text: "商品銷售排行",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "銷量",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "商品A" },
              { value: 735, name: "商品B" },
              { value: 580, name: "商品C" },
              { value: 484, name: "商品D" },
              { value: 300, name: "商品E" },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    this.getSalesTrend();
    this.getSalesRanking();
  },
  methods: {
    // 生成完整的日期範圍數組
    createDateRange(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const dateArray = [];

      while (start <= end) {
        dateArray.push(new Date(start).toISOString().slice(0, 10)); // 格式化為 "YYYY-MM-DD"
        start.setDate(start.getDate() + 1); // 日期增加一天
      }

      return dateArray;
    },
    async getSalesTrend() {
      this.$toast.loading({
        message: "加載中...",
        forbidClick: true,
        duration: 5000,
      });
      // 調整日期範圍，確保包含結束日期的完整一天
      const [start, end] = this.dateRange.map((date, index) => {
        if (index === 1) {
          const newEndDate = new Date(date);
          newEndDate.setDate(newEndDate.getDate() + 1); // 結束日期加一天
          return newEndDate.toISOString().slice(0, 10); // 格式化為 "YYYY-MM-DD"
        }
        return date.toISOString().slice(0, 10); // 開始日期不變
      });

      const params = {
        startDate: start,
        endDate: end,
      };
      console.log(params);

      try {
        const res = await getSalesTrendAPI(params);
        console.log(res);

        const salesData = res.data;

        // 1. 生成完整的日期範圍
        const completeDates = this.createDateRange(start, end);

        // 2. 將查詢結果轉換為一個銷售額對應的日期字典
        const salesDict = {};
        salesData.forEach((item) => {
          salesDict[item.sale_date] = parseInt(item.total_sales, 10); // 記錄每個日期的銷售額
        });

        // 3. 使用完整的日期範圍補全空白日期的銷售額為 0
        const formattedSalesData = completeDates.map((date) => ({
          sale_date: date,
          total_sales: salesDict[date] || 0, // 如果該日期無銷售額，設為 0
        }));

        // 4. 更新圖表數據
        this.salesTrendOptions.xAxis.data = formattedSalesData.map(
          (item) => item.sale_date
        );
        this.salesTrendOptions.series[0].data = formattedSalesData.map(
          (item) => item.total_sales
        );
        this.$toast.success("加載成功");
      } catch (err) {
        console.log(err);
      }
    },
    async getSalesRanking() {
      // 調整日期範圍，確保包含結束日期的完整一天
      const [start, end] = this.dateRange.map((date, index) => {
        if (index === 1) {
          const newEndDate = new Date(date);
          newEndDate.setDate(newEndDate.getDate() + 1); // 結束日期加一天
          return newEndDate.toISOString().slice(0, 10); // 格式化為 "YYYY-MM-DD"
        }
        return date.toISOString().slice(0, 10); // 開始日期不變
      });

      const params = {
        startDate: start,
        endDate: end,
      };
      console.log(params);
      try {
        const res = await getSalesRankingAPI(params);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.dashboard {
  max-width: 75vw;
  padding: 20px;
}

.data-card {
  display: flex;
  align-items: center;
}

.data-card .data-content {
  margin-left: 10px;
}

.data-card h3 {
  margin: 0;
  font-size: 24px;
}

.data-card p {
  margin: 0;
  font-size: 14px;
  color: #909399;
}

/* .el-range-editor {
  margin-left: 50px;
} */
</style>
