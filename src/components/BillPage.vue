<template>
  <el-container>
    <div class="padd">
      <el-table class="table_head table_border" :data="billList" size="small" border
                style="border-bottom: 0;padding:0">
        <el-table-column label="期数" align="center">
          <template slot-scope="scope">
            第{{ scope.row.planNum }}期
          </template>
        </el-table-column>
        <el-table-column prop="remainPrincipal" label="待还本金" column-key="remainPrincipal"
                         align="center"></el-table-column>
        <el-table-column prop="remainInterest" label="待还利息" column-key="remainInterest"
                         align="center"></el-table-column>
        <el-table-column prop="remainAmount" label="待还总额" column-key="remainAmount" align="center"></el-table-column>
        <el-table-column prop="fine" label="罚金" column-key="fine" align="center"></el-table-column>
        <el-table-column prop="repaymentStatus" label="状态" column-key="repaymentStatus"
                         align="center"></el-table-column>
        <el-table-column prop="planDate" label="还款时间" column-key="planDate" sortable align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.repaymentStatus !== '已还'"
                       v-on:click="clickButton(scope.row)"
            >
              还款
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        title="请选择还款方式"
        :visible.sync="dialogVisible"
        width="30%">
        <el-button type="primary" v-on:click="payBill(1)"
        >全额还款
        </el-button>
        <el-button type="primary" v-on:click="payBill(2)"
        >部分还款
        </el-button>
      </el-dialog>

    </div>
  </el-container>
</template>

<script>
export default {
  name: "BillPage",
  created() {
    // for (let i = 0; i < this.billList.length; i++) {
    //   if (this.billList[i].repaymentStatus === 1) {
    //     this.billList[i].repaymentStatus = '未还'
    //   } else if (this.billList[i].repaymentStatus === 2) {
    //     this.billList[i].repaymentStatus = '已还'
    //   } else if (this.billList[i].repaymentStatus === 3) {
    //     this.billList[i].repaymentStatus = '逾期'
    //   }
    // }
    this.updateTable()
  },
  data() {
    return {
      customerCode: this.$store.state.currentCustomerCode,
      accountNum: this.$store.state.currentAccountNum,
      iouNum: this.$store.state.currentIouNum,
      dialogVisible: false,
      billList: [
        //repaymentStatus: 1为未还，2为已还，3为逾期
        // {
        //   planNum: 1,//第几期
        //   remainPrincipal: 0,//剩余的本金
        //   remainInterest: 0,//剩余的利息
        //   remainAmount: 0,//剩余的本息总计
        //   fine: 0,//罚金
        //   repaymentStatus: 2,//2为已还
        //   planDate: "2021-04-07"//还款时间
        // },
        // {
        //   planNum: 2,
        //   remainPrincipal: 9883.763,
        //   remainInterest: 300.4669,
        //   remainAmount: 10184.2299,
        //   fine: 10,
        //   repaymentStatus: 3,//
        //   planDate: "2021-05-07"
        // },
        // {
        //   planNum: 3,
        //   remainPrincipal: 9883.763,
        //   remainInterest: 300.4669,
        //   remainAmount: 10184.2299,
        //   fine: 0,
        //   repaymentStatus: 1,
        //   planDate: "2021-06-07"
        // },
        // {
        //   planNum: 4,
        //   remainPrincipal: 9883.763,
        //   remainInterest: 300.4669,
        //   remainAmount: 20184.2299,
        //   fine: 0,
        //   repaymentStatus: 1,
        //   planDate: "2021-07-07"
        // },
      ],
      chosenRow: {},
    }
  },
  methods: {
    updateTable() {
      this.$axios.post('/getBills', {
        customerCode: localStorage.getItem('currentCustomerCode'),
        accountNum: localStorage.getItem('currentAccountNum'),
        iouNum: localStorage.getItem('currentIouNum'),
      })
        .then(resp => {
          console.log(resp)
          this.billList = resp.data.billList;
          for (let i = 0; i < this.billList.length; i++) {
            if (this.billList[i].repaymentStatus === 1) {
              this.billList[i].repaymentStatus = '未还'
            } else if (this.billList[i].repaymentStatus === 2) {
              this.billList[i].remainPrincipal = 0
              this.billList[i].remainInterest = 0
              this.billList[i].remainAmount = 0
              this.billList[i].repaymentStatus = '已还'
            } else if (this.billList[i].repaymentStatus === 3) {
              this.billList[i].repaymentStatus = '逾期'
            }
          }
        })
    },

    clickButton(row) {
      this.chosenRow = row;
      console.log(this.chosenRow)
      if (this.chosenRow.repaymentStatus === '逾期') {
        this.$confirm('此操作将先缴纳逾期罚金, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {//点击了确定
          this.$axios.post('/payFine', {
            customerCode: this.customerCode,
            accountNum: this.accountNum,
            iouNum: this.iouNum,
            planNum: this.chosenRow.planNum
          })
            .then(resp => {
              console.log(resp)
              if (resp.status === 200) {
                this.$message.success("缴纳罚款成功")
                this.updateTable()
              }
            })
            .catch(() => {
              this.$message.error("缴纳罚款失败，请检查余额")
            })
        }).catch(() => {//点击了取消
          this.$message.warning("已取消缴纳罚金")
        });
      } else {
        this.dialogVisible = true;
      }
    },

    payBill(payMethod) {
      this.dialogVisible = false
      if (payMethod === 1) {
        this.$axios.post('/repayment', {
          customerCode: this.customerCode,
          accountNum: this.accountNum,
          iouNum: this.iouNum,
          planNum: this.chosenRow.planNum,
          value: this.chosenRow.remainAmount
        })
          .then(resp => {
            console.log(resp)
            if (resp.status === 200) {
              this.$message.success("还款成功")
              this.updateTable()
            }
          })
          .catch(error => {
            console.log(error)
            this.$message.error("还款失败，请检查余额")
          })
      } else if (payMethod === 2) {
        this.$prompt('请输入还款金额', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          if (value > this.chosenRow.remainAmount) {
            this.$message.error("超出待还总额")
            return
          }
          this.$axios.post('/repayment', {
            customerCode: this.customerCode,
            accountNum: this.accountNum,
            iouNum: this.iouNum,
            planNum: this.chosenRow.planNum,
            value: value
          })
            .then(resp => {
              console.log(resp)
              if (resp.status === 200) {
                this.$message.success("还款成功")
                this.updateTable()
              }
            })
            .catch(error => {
              this.$message.error("还款失败，请检查余额")
              console.log(error)
            })
        }).catch(() => {
          this.$message.warning('取消输入');
        });
      }

    }
  },
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
