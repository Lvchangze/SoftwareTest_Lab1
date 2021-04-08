<template>
  <el-container>
    <div class="padd">
      <el-row>
        <el-col :span="6" class="searchPart" style="padding-left: 0">
          <div style="min-width: 70px;padding-right: 5px;">流 水 号</div>
          <el-input v-model="transactionNum" placeholder="搜索流水号" size="mini"></el-input>
        </el-col>
        <el-col :span="6" class="searchPart">
          <div style="min-width: 70px;padding-right: 5px;">交易账号</div>
          <el-input v-model="account" placeholder="搜索交易账号" size="mini"></el-input>
        </el-col>
        <el-col :span="6" class="searchPart">
          <div style="min-width: 70px;padding-right: 5px;">办理机构</div>
          <el-input v-model="organization" placeholder="请选择" size="mini"></el-input>
        </el-col>
        <el-col :span="6" class="searchPart">
          <div style="min-width: 70px;padding-right: 5px;">交易代码</div>
          <el-input v-model="input" placeholder="选择交易代码" size="mini"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="searchPart" style="padding-left: 0">
          <div style="min-width: 70px;padding-right: 5px;">开始日期</div>
          <el-input v-model="input" placeholder="搜索流水号" size="mini"></el-input>
        </el-col>
        <el-col :span="6" class="searchPart">
          <div style="min-width: 70px;padding-right: 5px;">结束日期</div>
          <el-input v-model="input" placeholder="搜索交易账号" size="mini"></el-input>
        </el-col>
      </el-row>

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
      transactionNum:'',
      account:'',
      organization:'',
      transactionList: [
        {
          transactionNum: "lcz0151020202104071432191",
          branchName: "吕昌泽的机构",
          transactionType: "银行卡存入",
          amount: 5000,
          account: "lcz01202104074",
          operatorTime: "2021-04-07 14:32:19",
        },
        {
          transactionNum: "yyh0151020202104071432191",
          branchName: "吕昌泽的机构",
          transactionType: "银行卡存入",
          amount: 5000,
          account: "lcz01202104074",
          operatorTime: "2021-04-07 14:32:19",
        }
      ]
    }
  },
  computed:{
    transactionList:function(){
      var search=this.transactionNum;
      if(search){
        return  this.transactionList.filter(function(dataNews){
          return Object.keys(dataNews).some(function(key){
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.transactionList
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
.searchPart{
  display: flex;
  line-height: 28px;
  font-size: 14px;
  padding-left: 10px;
  margin-bottom: 15px;
}

</style>
