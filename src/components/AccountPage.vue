<template>
  <el-container>
    <div class="padd">
      <el-table class="table_head table_border" :data="accountList" size="small" border
                style="border-bottom: 0;padding:0">
        <el-table-column prop="accountNum" label="账号" column-key="accountNum" align="center"></el-table-column>
        <el-table-column prop="voucherName" label="凭证类型" column-key="customerName" align="center"></el-table-column>
        <el-table-column prop="accountTypeName" label="账户类型" column-key="loanStatus" align="center"></el-table-column>
        <el-table-column prop="balance" label="余额" column-key="productName" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" column-key="productCode" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" column-key="overdueBalance" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" v-on:click="gotoLoanPage(scope.row)">查看贷款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-container>
</template>

<script>
export default {
  name: "AccountPage",
  created() {
    // for (let i = 0; i < this.accountList.length; i++) {
    //   if (this.accountList[i].state === 1) {
    //     this.accountList[i].state = "正常"
    //   }
    // }
    this.$axios.post('/getAccounts', {
      customerCode: localStorage.getItem('currentCustomerCode')
    })
      .then(resp => {
        this.accountList = resp.data.accountList;
        for (let i = 0; i < this.accountList.length; i++) {
          if (this.accountList[i].state === 1) {
            this.accountList[i].state = "正常"
          }
        }
      })
  },
  data() {
    return {
      customerCode: this.$store.state.currentCustomerCode,
      chosenRow: {},
      accountList: [
        // {
        //   accountNum: '6161754432644526488',
        //   voucherName: '银行卡',
        //   accountTypeName: '储帐户',
        //   balance: 279996.54,
        //   state: 1,
        //   updateTime: '2021-04-07 14:54:39'
        // },
      ]
    }
  },
  methods: {
    gotoLoanPage(row) {
      this.chosenRow = row
      this.$store.commit('setCurrentAccountNum', this.chosenRow.accountNum)
      console.log(this.$store.state.currentAccountNum)
      this.$router.push('/LoanPage')
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
