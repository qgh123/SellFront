<template>
    <div>
      <!--请求按钮-->
      <div style="margin: 10px 0;">
        <el-row>
          <el-button type="primary" @click="dialogVisible = true" size="medium" style="margin-left: 10px;">新增类目</el-button>
        </el-row>
      </div>
      <!--列表展示-->
      <el-table
        :data="categoryList"
        style="width: 100%"
        border
        empty-text="尚未添加任何类目"
        :header-cell-style="{background:'#ccc',color:'#606266'}">
        <el-table-column
          type="index"
          label="序号"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="类目名称"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="categoryDesc"
          label="类目描述"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="200"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | dateFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="delCategory(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--新增类目弹出框-->
      <el-dialog
        title="新增类目"
        :visible.sync="dialogVisible"
        width="40%"
        @close="beforeClose">
        <el-form :model="categoryForm">
          <el-row>
            <el-form-item label="类目名称" label-width="70px">
              <el-input v-model="categoryForm.categoryName" style="width: 90%"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="类目描述" label-width="70px">
              <el-input v-model="categoryForm.categoryDesc" style="width: 90%"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false;">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import {addCategory, getAllCategory, delCategoryById} from "../../api/item/item";

export default {
  name: "Category",
  data() {
      return {
        dialogVisible: false,
        categoryForm: {},
        categoryList: []
      }
  },
  mounted() {
    this.search()
  },
  methods: {
    search() {
      getAllCategory({}).then(res => {
        this.categoryList = res.data.data
      })
    },
    clear() {
      this.categoryForm = {}
    },
    beforeClose() {
      this.clear()
    },
    submit() {
      addCategory(this.categoryForm).then(res => {
        this.search()
        this.$message.success("类目添加成功")
        this.dialogVisible = false
        this.clear()
      })
    },
    delCategory(id) {
      delCategoryById({id: id}).then(res => {
        this.search()
        this.$message.success("类目删除成功")
      })
    }
  }
}
</script>

<style scoped>

</style>
