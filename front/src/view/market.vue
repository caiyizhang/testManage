<template>
  <div>
    <i class="iconfont icon-shangsheng"></i>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="8">
          <el-date-picker v-model="ruleForm.dateSelect" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择日期">
          </el-date-picker>
        </el-col>
      </el-row>
    </el-form>
    <div class="box">
      <div class="title">
        <h1>最新中国公司市值TOP20</h1>
        <p>(统计截至2023年12月31日)</p>
      </div>
      <el-table :data="tableData" :header-cell-style="tableHeaderColor" style="width: 100%">
        <el-table-column prop="rank"  label="排名" width="60" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="change" align="center" label="变化"  width="200" show-overflow-tooltip>
          <template #default="scope">
            <div class="change">
              <img v-show="scope.row.change > 0" src="../assets/shangsheng.png" alt="">
              <img v-show="scope.row.change < 0" src="../assets/xiajiang.png" alt="">
              <span :class="scope.row.change == 100?'spans all':'spans'">{{ scope.row.change }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" width="180"  show-overflow-tooltip label="文件名">
        </el-table-column>
        <el-table-column prop="stack" show-overflow-tooltip width="220"  label="调用栈">
        </el-table-column>
        <el-table-column prop="count"  label="数量">
          <template #default="scope">
            <div>
              <myProgressWrap :percentage="Number(scope.row.percent)" :show-tooltip="false">
                <template #text>
                  <span>{{ scope.row.count }}</span>
                </template>
              </myProgressWrap>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="percent"  show-overflow-tooltip label="占比">
          <template slot-scope="scope">
            <span>{{ scope.row.percent }}%</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getMarket } from '../api/market';
const moment = require('moment-timezone');
import myProgressWrap from '../components/myProgressWrap'
export default {
  components: {
    myProgressWrap
  },
  data() {
    return {
      ruleForm: {
        dateSelect: this.getYesterday() // 设置默认值为前一天
      },
      tableData: []
    }
  },
  methods: {
    getYesterday() {
      const today = moment().tz('your-time-zone');
      const yesterday = today.clone().subtract(1, 'day');
      // 返回前一天的日期字符串，格式为 yyyy-MM-dd
      return yesterday.format('YYYY-MM-DD');
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return 'font-weight: 800;color:black;font-size:16px;';
    }
  },
  async mounted() {
    let res = await getMarket(this.ruleForm.dateSelect);
    this.tableData = res.data.data.map(item => {
      return {
        ...item,
        count: Number(item.count),
        percentage:Number(item.percentage)
      }
    });
  }
}
</script>

<style lang="less"  scoped>
.box {
  border: 2px solid #314c91;
  margin-top: 20px;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  .change {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .all {
      font-weight: 800;
      color: red;
    }

    .spans {
      display: inline-block;
      padding: 5px;
    }
  }

  .title {
    width: 54%;
    margin: 0 auto;
    font-weight: bold;

    h1 {
      color: #2f4d97;
      font-size: 24px;
    }

    p {
      color: #587690;
      margin-top: 10px;
    }
  }
}
</style>
