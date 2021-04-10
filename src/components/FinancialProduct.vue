<template>
  <el-container>
    <div class="padd">
      <el-table class="table_head table_border" :data="productList" size="small" border
                style="border-bottom: 0;padding:0">
        <el-table-column prop="type" label="类型" column-key="type" align="center"></el-table-column>
        <el-table-column prop="productName" label="产品名称" column-key="productName" align="center"></el-table-column>
        <el-table-column prop="yearlyBenefit" label="年化收益率" column-key="yearlyBenefit" align="center"></el-table-column>
        <el-table-column prop="timeLimit" label="产品期限" column-key="timeLimit" align="center"></el-table-column>
        <el-table-column prop="singlePrice" label="单价" column-key="singlePrice" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" v-if="judgeAccess(scope.row.type)"
                       v-on:click="buttonClick(scope.row)"
            >买入
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="请选择买入信息" :visible.sync="dialogVisible">
        <el-form :model="purchaseForm">
          <el-form-item label="选择买入日期">
            <el-date-picker style="width: 220px" v-model="purchaseForm.date"></el-date-picker>
          </el-form-item>
          <el-form-item label="填写股票股数" v-if="this.chosenRow.type === '股票'">
            <el-input-number style="width: 220px" v-model="purchaseForm.buyInNum" :min="1" :max="1000"
                             label="股票股数"></el-input-number>
          </el-form-item>
          <el-form-item label="填写买入份数" v-if="this.chosenRow.type !== '股票'">
            <el-input-number style="width: 220px" v-model="purchaseForm.buyInNum" :min="1" :max="1000"
                             label="买入份数"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" v-on:click="buyProduct">确 定</el-button>
        </div>
      </el-dialog>

    </div>

  </el-container>
</template>

<script>
export default {
  name: "FinancialProduct",
  created() {
    this.$prompt('请输入账户号', {
      distinguishCancelAndClose: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }).then(({value}) => {
      this.$message.success('输入成功');
      this.$store.commit('setCurrentAccountNum', value)
      this.$axios.post('/getCreditLevel', {
        accountNum: localStorage.getItem('currentAccountNum')
      })
        .then(resp => {
          this.creditLevel = resp.data.creditLevel //1,2,3
        })
        .catch(error => {
          console.log(error)
        })
    }).catch(() => {
      this.$message.error('请填写帐户号')
      this.$router.push('/Main')
    });

    this.$axios.post('/getProductList', "")
      .then(resp => {
        this.productList = resp.data.productList
      })
      .catch(error => {
        console.log(error)
      })
  },
  data() {
    return {
      accountNum: this.$store.state.currentAccountNum,
      creditLevel: 1,
      dialogVisible: false,
      purchaseForm: {
        date: "",
        buyInNum: 1,
      },
      productList: [
        {
          type: '股票',
          productName: "沃森生物",
          yearlyBenefit: "248.81%",
          timeLimit: "灵活申赎",
          singlePrice: 50
        },
        {
          type: '股票',
          productName: "和林微纳",
          yearlyBenefit: "179.69%",
          timeLimit: "灵活申赎",
          singlePrice: 50
        },
        {
          type: '基金',
          productName: "广发价值领先混合",
          yearlyBenefit: "36.75%",
          timeLimit: "灵活申赎",
          singlePrice: 100
        },
        {
          type: '基金',
          productName: "中欧价值智选回报",
          yearlyBenefit: "30.69%",
          timeLimit: "灵活申赎",
          singlePrice: 100
        },
        {
          type: '定期',
          productName: "安增益31天",
          yearlyBenefit: "3.07%",
          timeLimit: "31天",
          singlePrice: 500
        },
        {
          type: '定期',
          productName: "天弘闲钱佳",
          yearlyBenefit: "3.49%",
          timeLimit: "90天",
          singlePrice: 1000
        }, {
          type: '定期',
          productName: "建信养老飞年宝",
          yearlyBenefit: "3.76%",
          timeLimit: "365天",
          singlePrice: 2000
        }
      ],
      chosenRow: {},
    }
  },
  methods: {
    judgeAccess(type) {
      if (this.creditLevel === 1) {
        return true
      } else if (this.creditLevel === 2 && (type === "基金" || type === "定期")) {
        return true
      } else if (this.creditLevel === 3 && type === "定期") {
        return true
      }
      return false
    },
    buttonClick(row) {
      this.dialogVisible = true;
      this.chosenRow = row;
      console.log(this.chosenRow)
    },
    buyProduct() {
      this.dialogVisible = false;
      this.$axios.post('/judgeFine', {
        accountNum: this.accountNum
      })
        .then(resp => {
          if (resp.status === 200) {//不包含罚金或者罚金金额已缴纳
            this.$axios.post('/buyProduct', {
              accountNum: this.accountNum,
              productName: this.chosenRow.productName,
              date: this.purchaseForm.date,
              buyInNum: this.purchaseForm.buyInNum,
              singlePrice: this.chosenRow.singlePrice,
            })
              .then(resp => {
                if (resp.status === 200) {
                  this.$message.success("买入成功")
                } else if (resp.status === 400) {
                  this.$message.error("余额不足")
                }
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            this.$message.error("余额不足以缴纳罚金")
          }
        })
        .catch(error => {
          console.log(error)
        })
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
</style>
