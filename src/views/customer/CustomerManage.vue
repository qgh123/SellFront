<template>
    <div>
      <!--查询条件-->
      <el-form label-width="100px" v-model="searchForm">
        <el-form-item label="客户名称" class="formInputClass">
          <el-input v-model="searchForm.name" size="mini" class="formInput"></el-input>
        </el-form-item>
        <el-form-item label="客户邮箱" class="formInputClass">
          <el-input v-model="searchForm.email" size="mini" class="formInput"></el-input>
        </el-form-item>
      </el-form>
      <div style="display: inline-block">
        <el-button type="primary" size="mini" style="margin-left: 30px;padding: 12px 24px" @click="search">查找</el-button>
      </div>
      <div style="display: inline-block">
        <el-button type="primary" size="mini" style="margin-left: 30px;padding: 12px 24px" @click="visible=true">添加客户</el-button>
      </div>

      <!--数据显示-->
      <div style="margin-top: 20px;">
        <el-table
          :data="tableData"
          border
          style="font-size: 12px"
          empty-text="暂无数据"
          :header-cell-style="{background:'#ccc',color:'#606266'}">
          <el-table-column
            prop="name"
            label="客户名称"
            width="200"
            header-align="center">
          </el-table-column>
          <el-table-column
            prop="email"
            label="客户邮箱"
            width="180"
            header-align="center">
          </el-table-column>
          <el-table-column
            prop="token"
            label="token"
            width="270"
            header-align="center">
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <el-row class="pagination" style="margin-top: 10px;margin-left: 400px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="searchForm.pageNum"
            :page-size="searchForm.pageSize"
            :page-sizes="[5, 10, 15, 20]"
            layout="sizes, prev, pager, next"
            :total="totals">
          </el-pagination>
        </el-row>
      </div>

      <!--新增弹出框-->
      <el-dialog
        title="新增客户"
        :visible.sync="visible"
        width="30%">
        <el-form :model="customer" size="mini" label-width="150px" ref="customer">
          <el-row>
            <el-form-item label="客户名称">
              <el-input style="width: 250px;" v-model="customer.name" placeholder="客户名称"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="客户邮箱">
              <el-input style="width: 250px;" v-model="customer.email" placeholder="客户邮箱"></el-input>
            </el-form-item>
          </el-row>
          <el-button type="success" size="small" style="margin-left: 80%" @click="add">保存</el-button>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
  import {getCustomerList,addCustomer} from "../../api/customer/customer";
  import {Message} from 'element-ui';

  export default {
      name: "customer-manage",
      data() {
        return {
          searchForm: {
            pageNum: 1,
            pageSize: 5
          },
          tableData: [],
          customer: {},
          visible: false,
          totals: 0
        }
      },
      mounted() {
        this.search()
      },
      methods: {
        search() {
          getCustomerList(this.searchForm).then(res => {
            this.tableData = res.data.data
          })
        },
        add() {
          addCustomer(this.customer).then(res => {
            this.visible = false
            this.search()
            Message({
              message: "添加成功",
              type: 'success',
              duration: 3 * 1000
            })
          }).catch(err => {
            this.visible = false
            Message({
              message: "添加失败",
              type: 'error',
              duration: 3 * 1000
            })
          })
        },
        handleSizeChange() {
          this.searchForm.pageSize = val
          this.search()
        },
        handleCurrentChange() {
          this.searchForm.pageNum = val
          this.search()
        }
      }
    }
</script>

<style scoped>
  .formInput {
    width: 220px;
  }
  .formInputClass {
    float: left;
    margin: 0px;
    padding: 0px;
    font-size: 25px;
  }
</style>
