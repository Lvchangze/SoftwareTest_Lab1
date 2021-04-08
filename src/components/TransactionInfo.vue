<template>
  <el-container>
    <div class="padd">


    <el-table class="table_head table_border" :data="transactionList" size="small" border stripe="true" style="border-bottom: 0;padding:0">
      <el-table-column
        type="selection" align="center"
        >
      </el-table-column>
      <el-table-column prop="transactionNum" label="流水号" column-key="transactionNum"  align="center" width="294px"></el-table-column>
      <el-table-column prop="branchName" label="办理机构" column-key="branchName" align="center"></el-table-column>
      <el-table-column prop="transactionType" label="交易类型" column-key="transactionType" align="center"></el-table-column>
      <el-table-column prop="amount" label="金额(元)" column-key="amount" align="center"></el-table-column>
      <el-table-column prop="account" label="交易账号" column-key="account" align="center"></el-table-column>
      <el-table-column prop="operatorTime" label="操作时间" column-key="operatorTime" sortable align="center"></el-table-column>
      <el-table-column prop="age" label="操作" column-key="age" align="center">
        <template slot-scope="scope">
          <el-button @click="delete(scope.$index)" style="padding: 0;border: 0"><i class="el-icon-delete"></i></el-button></template>
      </el-table-column>
    </el-table>
    </div>
  </el-container>
</template>

<script>
export default {
  name: "TransactionInfo",
  created() {
    this.$axios.post('/getTransactionInfo', "")
      .then(resp => {
        this.transactionList = resp.data.transactionList
      })
      .catch(error => {
        console.log(error)
      })
  },
  data() {
    return {
      transactionList: [
        {
          transactionNum: "lcz0151020202104071432191",
          branchName: "吕昌泽的机构",
          transactionType: "银行卡存入",
          amount: 5000,
          account: "lcz01202104074",
          operatorTime: "2021-04-07 14:32:19",
        }
      ]
    }
  },
  methods: {
    delete(index){
      this.$axios.post('/deleteSatisfiedPatient', {
        patientId: this.patientTableData[index].id,
      })
        .then(resp => {
          this.searchPatient();
        })
        .catch(error => {
          this.$message.error("出院失败，请重试");
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.padd{
  padding: 20px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;
  margin-left: 13px;
}
</style>
