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
          <el-input v-model="organization" placeholder="搜索办理结构" size="mini"></el-input>
        </el-col>
        <el-col :span="6" class="searchPart">
          <div style="min-width: 70px;padding-right: 5px;">交易代码</div>
          <el-input v-model="transactionCode" placeholder="选择交易代码" size="mini"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="searchPart" style="padding-left: 0">
          <div style="min-width: 70px;padding-right: 5px;">开始日期</div>
          <el-date-picker v-model="startDate" type="date" placeholder="选择开始日期" size="mini"
                          style="width: 250px"></el-date-picker>
        </el-col>
        <el-col :span="6" class="searchPart">
          <div style="min-width: 70px;padding-right: 5px;">结束日期</div>
          <el-date-picker v-model="endDate" type="date" placeholder="选择结束日期" size="mini"
                          style="width: 250px"></el-date-picker>
        </el-col>
        <el-button type="primary" v-on:click="search">搜索</el-button>
      </el-row>

      <el-table class="table_head table_border" :data="transactionList" size="small" border
                style="border-bottom: 0;padding:0">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="transactionNum" label="流水号" column-key="transactionNum" align="center"
                         width="294px"></el-table-column>
        <el-table-column prop="branchName" label="办理机构" column-key="branchName" align="center"></el-table-column>
        <el-table-column prop="transactionType" label="交易类型" column-key="transactionType"
                         align="center"></el-table-column>
        <el-table-column prop="amount" label="金额(元)" column-key="amount" align="center"
                         sortable></el-table-column>
        <el-table-column prop="account" label="交易账号" column-key="account" align="center"></el-table-column>
        <el-table-column prop="operatorTime" label="操作时间" column-key="operatorTime" sortable
                         align="center"></el-table-column>
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
        console.log(resp)
        this.transactionList = resp.data.transactionList
      })
      .catch(error => {
        console.log(error)
      })
  },
  data() {
    return {
      transactionNum: '',
      account: '',
      organization: '',
      transactionCode: '',
      startDate: '',
      endDate: '',
      transactionList: [
        {
          transactionNum: "lcz0151020202104071432191",
          branchName: "吕昌泽的机构",
          transactionType: "银行卡存入",
          amount: 5000,
          account: "lcz01202104074",
          operatorTime: "2021-04-07 14:32:19",
          transactionCode: "5220",
        },
        {
          transactionNum: "yyh0151020202104071432191",
          branchName: "吕昌泽的机构",
          transactionType: "柜员现金调拨",
          amount: 4000,
          account: "lcz01202104075",
          operatorTime: "2021-04-07 14:22:20",
          transactionCode: "0220",
        }
      ]
    }
  },
  methods: {
    search(){
      console.log("")
    },
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

.searchPart {
  display: flex;
  line-height: 28px;
  font-size: 14px;
  padding-left: 10px;
  margin-bottom: 15px;
}

</style>
