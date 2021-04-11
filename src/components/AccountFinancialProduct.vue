<template>
  <el-container>
    <div class="padd">
      <el-table class="table_head table_border" :data="accountFinancialProductList" size="small" border
                style="border-bottom: 0;padding:0">
        <el-table-column prop="type" label="类型" column-key="type" align="center"></el-table-column>
        <el-table-column prop="productName" label="产品名称" column-key="productName" align="center"></el-table-column>
        <el-table-column prop="date" label="买入日期" column-key="date" align="center"></el-table-column>
        <el-table-column prop="singlePrice" label="实时单价" column-key="singlePrice" align="center"></el-table-column>
        <el-table-column prop="buyInNum" label="买入数量" column-key="buyInNum" align="center"></el-table-column>
        <el-table-column prop="yesterdayBenefit" label="昨日收益" column-key="yesterdayBenefit"
                         align="center"></el-table-column>
      </el-table>
    </div>
  </el-container>
</template>

<script>
export default {
  name: "CustomerFinancialProduct",
  created() {
    this.$prompt('请输入账户号', {
      distinguishCancelAndClose: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }).then(({value}) => {
      this.$message.success('输入成功');
      this.$store.commit('setCurrentAccountNum', value)
      this.$axios.post('/getAccountFinancialProductList', {
        accountNum: localStorage.getItem('currentAccountNum')
      })
        .then(resp => {
          this.accountFinancialProductList = resp.data.accountFinancialProductList
        })
        .catch(error => {
          console.log(error)
        })
    })
      .catch(() => {
        this.$message.error('请填写客户身份证号')
        this.$router.push('/Main')
      })
  },
  data() {
    return {
      accountFinancialProductList: [
        {
          type: '定期',
          productName: "安增益31天",
          date: "2021-04-07",
          singlePrice: 500,
          buyInNum: 10,
          yesterdayBenefit: -70
        }
      ]
    }
  },
  methods: {}
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
