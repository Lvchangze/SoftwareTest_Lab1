<template>
  <el-container>
    <el-button type="primary" style="width: 200px;height: 100px;margin-top: 200px;margin-left: 480px"
               @click="dialogFormVisible = true">
      <span style="font-size: 25px">自动归还贷款</span>
    </el-button>
    <el-dialog title="请选择日期" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="请选择日期">
          <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="form.date"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" v-on:click="autoPayBack">确 定</el-button>
      </div>
    </el-dialog>

  </el-container>
</template>

<script>
export default {
  name: "AutoPayBack",
  data() {
    return {
      form:{
        date: ""
      },
      dialogFormVisible: false,
    }
  },
  methods: {
    autoPayBack() {
      console.log(this.form.date)
      this.$axios.post('/autoPayBack', {
        date: this.form.date
      })
        .then(resp => {
          if (resp.status === 200) {
            this.$message({
              message: '自动还款成功',
              type: 'success'
            });
          }
        })
        .catch(error => {
          this.$message({
            message: '存在账户无法还款（无法缴纳罚款或无法全额还款）',
            type: 'error',
            duration: 6000
          });
          console.log(error)
        })
    }

  }
}
</script>

<style scoped>

</style>
