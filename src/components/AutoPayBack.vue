<template>
  <el-container>
    <el-button type="primary" style="width: 200px;height: 100px;margin-top: 200px;margin-left: 480px"
               v-on:click="autoPayBack">
      <span style="font-size: 25px">自动归还贷款</span>
    </el-button>
  </el-container>
</template>

<script>
export default {
  name: "AutoPayBack",
  data() {
    return {}
  },
  methods: {
    autoPayBack() {
      this.$axios.post('/autoPayBack', "")
        .then(resp => {
          if (resp.status === 200) {
            this.$message({
              message: '自动还款成功',
              type: 'success'
            });
          } else if (resp.status === 400) {
            this.$message({
              message: '存在账户无法还款（无法缴纳罚款或无法全额还款）',
              type: 'error',
              duration: 6000
            });
          // } else if (resp.status === 403) {
          //   this.$message({
          //     message: '存在账户无法缴纳欠款',
          //     type: 'warning',
          //     duration: 6000
          //   });
          // } else {
          //   this.$message({
          //     message: '出错了，请重试',
          //     type: 'error',
          //   });
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
