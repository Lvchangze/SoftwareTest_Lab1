<template>
  <el-container>
    <div class="padd">
      <el-table class="table_head table_border" :data="loanList" size="small" border style="border-bottom: 0;padding:0">
        <el-table-column prop="iouNum" label="借据号" column-key="iouNum" align="center"></el-table-column>
        <el-table-column prop="customerCode" label="客户号" column-key="customerCode" align="center"></el-table-column>
        <el-table-column prop="customerName" label="客户名" column-key="customerName" align="center"></el-table-column>
        <el-table-column prop="loanStatus" label="贷款状态" column-key="loanStatus" align="center"></el-table-column>
        <el-table-column prop="productName" label="贷款产品" column-key="productName" align="center"></el-table-column>
        <el-table-column prop="productCode" label="贷款产品编号" column-key="productCode" align="center"></el-table-column>
        <el-table-column prop="overdueBalance" label="逾期金额（元）" column-key="overdueBalance" align="center"></el-table-column>
        <el-table-column prop="createTime" label="发放时间" column-key="createTime" sortable align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" v-on:click="gotoBillPage(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-container>
</template>

<script>
export default {
  name: "LoanPage",
  created() {
    // for (let i = 0 ; i < this.loanList.length;i++){
    //   if (this.loanList[i].loanStatus === 2){
    //     this.loanList[i].loanStatus = "正常"
    //   }
    // }
    this.$axios.post('/getLoans', {
      customerCode: localStorage.getItem('currentCustomerCode'),
      accountNum: localStorage.getItem('currentAccountNum')
    })
      .then(resp => {
        console.log(resp)
        this.loanList = resp.data.loanList;
        for (let i = 0 ; i < this.loanList.length;i++){
          if (this.loanList[i].loanState === 2){
            this.loanList[i].loanState = "正常"
          }
        }
      })
  },
  data() {
    return {
      customerCode: this.$store.state.currentCustomerCode,
      accountNum: this.$store.state.currentAccountNum,
      chosenRow: {},
      loanList: [
        {
          iouNum: "lcz6161754432644526488",//借据号
          customerCode: "lcz01202104075",//客户号
          customerName: "吕昌泽的客户二",//客户名
          loanStatus: 2,//2为正常
          productName: "买房贷款",//贷款产品
          productCode: "20001",//贷款产品编号
          overdueBalance: 0,//逾期金额
          createTime: '2021-04-07'//发放日期
        },
        {
          iouNum: "lcz7161754432644526488",
          customerCode: "lcz01202104075",
          customerName: "吕昌泽的客户二",
          loanStatus: 2,
          productName: "买房贷款",
          productCode: "20001",
          overdueBalance: 0,
          createTime: '2021-04-07'
        },
      ]
    }
  },
  methods: {
    gotoBillPage(row) {
      this.chosenRow = row
      this.$store.commit('setCurrentIouNum', this.chosenRow.iouNum)
      console.log(this.$store.state.currentIouNum)
      this.$router.push('/BillPage')
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
