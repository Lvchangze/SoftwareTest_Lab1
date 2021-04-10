<template>
  <el-container>
    <el-form label-position="top"
             label-width="0px"
             style="width: 260px;margin: auto;">
      <el-form-item prop="customerId" label="验证客户身份证号" label-width="90px">
        <el-input v-model="idnumber" placeholder="请输入客户身份证号"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" v-on:click="verify">验证</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  name: "ClerkPayBack",
  data() {
    return {
      idnumber: '',
    }
  },
  methods: {
    verify() {
      this.$router.push('/AccountPage')

      // this.$axios.post('/verifyCustomer', {
      //   idnumber: this.idnumber
      // })
      //   .then(resp => {
      //     if (resp.status === 200) {//客户验证成功
      //       this.$store.commit('setCurrentCustomerCode', resp.data.customerCode)
      //       this.$router.push('/AccountPage')
      //     } else if (resp.status === 404) {//客户不存在
      //       this.$message.error("客户不存在")
      //     }
      //   })

    }
  }
}
</script>

<style scoped>

</style>
