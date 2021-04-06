<template>
  <el-container>

  </el-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  created() {
    this.$axios.post('/loan/repayment', ""
    ).then(resp => {
      console.log(resp)
    })
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
