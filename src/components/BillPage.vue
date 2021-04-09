<template>
  <el-container>
    <div class="padd">
      <el-table class="table_head table_border" :data="billList" size="small" border
                style="border-bottom: 0;padding:0">
        <el-table-column label="期数" align="center" width="294px">
          <template slot-scope="scope">
            第{{ scope.row.planNum }}期
          </template>
        </el-table-column>
        <el-table-column prop="remainPrincipal" label="待还本金" column-key="accountNum" align="center"
                         width="294px"></el-table-column>
        <el-table-column prop="remainInterest" label="待还利息" column-key="certificateType"
                         align="center"></el-table-column>
        <el-table-column prop="remainAmount" label="待还总计" column-key="accountType"
                         align="center"></el-table-column>
        <el-table-column prop="repaymentStatus" label="状态" column-key="repaymentStatus"
                         align="center"></el-table-column>
        <el-table-column prop="planDate" label="还款时间" column-key="planDate" sortable
                         align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" v-on:click="payBack">还款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </el-container>
</template>

<script>
export default {
  name: "BillPage",
  created() {
    this.$axios.post('/getBills', {
      accountNum: this.accountNum
    })
      .then(resp => {
        this.billList = resp.data.billList;
      })
  },
  data() {
    return {
      accountNum: this.$store.state.currentAccountNum,
      billList: [
        {
          planNum: 2,
          remainPrincipal: "9883.763",
          remainInterest: "300.4669",
          remainAmount: "10184.2299",
          repaymentStatus: "待还",
          planDate: "2021-04-07 15:20:10"
        },
      ]
    }
  },
  methods: {
    payBack() {

    }
  }
}
</script>

<style scoped>
.padd {
  padding: 20px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;
  margin-left: 13px;
}
</style>
