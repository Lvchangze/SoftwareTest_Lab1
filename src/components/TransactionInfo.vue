<template>
  <el-container>

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
  methods: {}
}
</script>

<style scoped>

</style>
