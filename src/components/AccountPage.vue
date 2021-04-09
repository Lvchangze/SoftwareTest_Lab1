<template>
  <el-container>
    <div class="padd">
      <el-table class="table_head table_border" :data="accountList" size="small" border
                style="border-bottom: 0;padding:0">
        <el-table-column prop="accountNum" label="账户账号" column-key="accountNum" align="center"
                         width="294px"></el-table-column>
        <el-table-column prop="certificateType" label="凭证类型" column-key="certificateType"
                         align="center"></el-table-column>
        <el-table-column prop="accountType" label="账户类型" column-key="accountType"
                         align="center"></el-table-column>
        <el-table-column prop="balance" label="余额" column-key="balance" align="center"
                         sortable></el-table-column>
        <el-table-column prop="accountState" label="状态" column-key="accountState" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" column-key="updateTime" sortable
                         align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" v-on:click="gotoBillPage(scope.row.accountNum)">查看账单</el-button>
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
    this.$axios.post('/getAllBills', {
      idnumber: this.idnumber
    })
      .then(resp => {
        this.accountList = resp.data.accountList;
      })
  },
  data() {
    return {
      idnumber: this.$store.state.currentIdnumber,
      accountList: [
        {
          accountNum: "6161754432644526488",//账户账号
          certificateType: '银行卡',//凭证类型
          accountType: "储蓄帐户",//账户类型
          balance: 279996.54,//余额
          accountState: 0,//状态
          updateTime: '2021-04-07 14:54:39'//更新时间
        },
      ]
    }
  },
  methods: {
    gotoBillPage(accountNum) {
      // console.log(accountNum)
      this.$store.commit('setCurrentAccountNum', accountNum)
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
