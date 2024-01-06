<template>
  <div class="content">
    <el-row>
      <el-col :span="24">
        <el-form ref="form" :model="form" label-width="130px" :rules="rules">
          <el-form-item label="选择比较日期" prop="datePicker">
            <el-date-picker @change="dateChange" size="small" v-model="form.datePicker" type="daterange"
              value-format="yyyy-MM-dd" format="yyyy-MM-dd" range-separator="VS" start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="compareDate">
          <h4>{{ `${form.datePicker[0]}打开${openCount.startdate}次,${form.datePicker[1]}打开${openCount.comparedate}次` }}
          </h4>
          <h4>被比较日期闪退统计</h4>
          <h4>日期:{{ form.datePicker ? form.datePicker[0] : '' }}</h4>
        </div>
        <el-table :data="startDate" style="width: 60%;margin-top:20px;margin:0 auto"
          header-cell-class-name="table_header">
          <el-table-column prop="rank" label="排行" width="80" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="filename" label="文件名" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="count" show-overflow-tooltip width="100" label="次数">
          </el-table-column>
          <el-table-column prop="rate" :formatter="rateFormatter" show-overflow-tooltip width="100" label="占比">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <div class="compareDate">
        <h4>比较日期闪退统计</h4>
        <h4>日期:{{ form.datePicker ? form.datePicker[1] : '' }}</h4>
      </div>
      <el-table :data="compareDate" style="width: 100%;margin-top:20px" header-cell-class-name="table_header">
        <el-table-column prop="rank" align="center" label="排行" show-overflow-tooltip width="80">
        </el-table-column>
        <el-table-column prop="filename" align="center" show-overflow-tooltip label="文件名" width="140">
        </el-table-column>
        <el-table-column prop="count" align="center" show-overflow-tooltip label="次数">
        </el-table-column>
        <el-table-column prop="rate" align="center" :formatter="percentFormatter" show-overflow-tooltip label="占比">
        </el-table-column>
        <el-table-column prop="countwithstart" width="170" align="center" show-overflow-tooltip
          :label="`换算成${form.datePicker ? form.datePicker[0] : ''}`">
        </el-table-column>
        <el-table-column prop="change" align="center" show-overflow-tooltip label="变化情况">
          <template #default="scope">
            <div class="change">
              <img v-show="scope.row.change > 0" src="../assets/shangsheng.png" alt="">
              <img v-show="scope.row.change < 0" src="../assets/xiajiang.png" alt="">
              <span :class="scope.row.change == 100 ? 'spans all' : 'spans'">{{ scope.row.change }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="contribute_rate" align="center" width="100" :formatter="influenceFormatter" show-overflow-tooltip
          label="对闪退影响">
          <template #default="scope">
            <div class="change">
              <img v-show="scope.row.contribute_rate > 0" src="../assets/shangsheng.png" alt="">
              <img v-show="scope.row.contribute_rate < 0" src="../assets/xiajiang.png" alt="">
              <span
                :class="scope.row.contribute_rate > 0 ? 'spans all' : scope.row.contribute_rate < 0 ? 'spans green' : 'spans'">{{
                  scope.row.contribute_rate }}%</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { compareCrash } from '../api/market'
export default {
  data() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return {
      form: {
        datePicker: [
          yesterday.toISOString().split('T')[0],
          new Date().toISOString().split('T')[0]
        ],
      },
      rules: {
        datePicker: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      compareDate: [],
      openCount: {},
      startDate: []
    }
  },
  methods: {
    dateChange() {
      if (this.form.datePicker) {
        this.init()
      }
    },
    influenceFormatter(row) {
      return row.contribute_rate + '%'
    },
    percentFormatter(row) {
      console.log(row)
      return row.percent + '%'
    },
    rateFormatter(row) {
      return row.percent + '%';
    },
    async init() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let obj = {
            startdate: this.form.datePicker[0],
            enddate: this.form.datePicker[1]
          }
          compareCrash(obj).then(res => {
            let data = res.data.data;
            this.compareDate = data.comparedate;
            this.openCount = data.opencount;
            this.startDate = data.startdate;
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
      /deep/ .table_header {
        background: #DDDDDD !important;
        color: black !important;
      }
      .change {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .all {
          font-weight: 800;
          color: red !important;
        }

        .green {
          font-weight: 800;
          color: green !important;
        }

        .spans {
          display: inline-block;
          padding: 5px;
          color: black;
        }
      }
    .compareDate {
      text-align: center;
      min-height: 60px;
      h4 {
        margin: 10px 0;
      }
    }
</style>
