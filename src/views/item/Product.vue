<template>
    <div>
      <!--请求按钮-->
      <div style="margin: 10px 0;">
        <el-form>
          <el-row>
            <el-col :span="4">
              <el-input v-model="searchForm.productName" size="medium" placeholder="商品名称" clearable></el-input>
            </el-col>
            <el-col :span="4">
              <el-select v-model="searchForm.categoryId" clearable placeholder="请选择类别" style="margin-left: 10px;">
                <el-option
                  v-for="item in categoryOption"
                  :key="item.id"
                  :label="item.categoryName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="searchForm.productStatus" clearable placeholder="是否上架" style="margin-left: 10px;">
                <el-option
                  v-for="item in statusOption"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-button type="primary" @click="search" size="medium" style="margin-left: 10px;">查询商品</el-button>
            <el-button type="primary" @click="dialogVisible = true" size="medium" style="margin-left: 10px;">新增商品</el-button>
          </el-row>
        </el-form>
      </div>
      <!--列表展示-->
      <el-table
        :data="productList"
        style="width: 100%"
        border
        empty-text="尚未添加任何商品"
        :header-cell-style="{background:'#ccc',color:'#606266'}">
        <el-table-column
          type="index"
          label="序号"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="商品名称"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="productPrice"
          label="单价"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="productStock"
          label="库存"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="productDescription"
          label="商品描述"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          label="是否上架"
          width="100"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.productStatus == 'N' ? "是" : "否"}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="所属类目"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          label="商品图片"
          width="200"
          align="center">
          <template slot-scope="scope">
            <img :src="scope.row.productImage" style="width: 100px;height: 100px;"/>
          </template>
        </el-table-column>
      </el-table>
      <!--分页条-->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNum"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="total"
        style="margin-left: 68%">
      </el-pagination>
      <!--新增类目弹出框-->
      <el-dialog
        title="新增商品"
        :visible.sync="dialogVisible"
        width="40%"
        @close="beforeClose">
        <el-form :model="productForm">
          <el-row>
            <el-col :span="12">
              <el-row>
                <el-form-item label="商品名称" label-width="70px">
                  <el-input v-model="productForm.productName" style="width: 90%"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="单价" label-width="70px">
                  <el-input v-model="productForm.productPrice" type="number" style="width: 90%"></el-input>
                </el-form-item>
              </el-row>
            </el-col>
            <el-col :span="12">
              <img-upload
                style="margin-left: 4vw;"
                path="product"
                :cropper="true"
                :autoCropWidth="100"
                :auto-crop-height="100"
                height="100px"
                width="100px"
                :operator="true"
                v-model="imageUrl"
                @onDelete="imageUrl =''"
                @onSucceed="uploadSuccess"
                @onFailed="uploadFail"
              ></img-upload>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="库存" label-width="70px">
                <el-input v-model="productForm.productStock" type="number" style="width: 90%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属类目" label-width="70px">
                <el-select v-model="productForm.categoryId" clearable placeholder="请选择类别">
                  <el-option
                    v-for="item in categoryOption"
                    :key="item.id"
                    :label="item.categoryName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="描述" label-width="70px">
              <el-input v-model="productForm.productDescription" type="textarea" :rows="4"></el-input>
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
import ImgUpload from '../../components/imageUpload/ImgUpload'
import {getAllCategory, addProduct, getProduct} from "../../api/item/item";

export default {
    name: "Product",
    components: {ImgUpload},
    data() {
      return {
        productForm: {},
        searchForm: {},
        dialogVisible: false,
        productList: [],
        imageUrl: '',
        pageSize: 5,
        pageNum: 1,
        total: 0,
        categoryOption: [],
        statusOption: [
          {id: 'N',label:'已上架'},
          {id: 'D',label:'未上架'}
        ]
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.search()
        getAllCategory({}).then(res => {
          this.categoryOption = res.data.data
        })
      },
      search() {
        let param = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          productStatus: this.searchForm.productStatus,
          productName: this.searchForm.productName,
          categoryId: this.searchForm.categoryId
        }
        getProduct(param).then(res => {
          this.productList = res.data.data.records
          this.pageSize = Number(res.data.data.size)
          this.pageNum = Number(res.data.data.current)
          this.total = Number(res.data.data.total)
        })
      },
      clear() {
        this.productForm = {}
        this.imageUrl = ''
      },
      submit() {
        addProduct(this.productForm).then(res => {
          this.search()
          this.$message.success("商品添加成功")
          this.dialogVisible = false
          this.clear()
        })
      },
      beforeClose() {
        this.clear()
      },
      uploadSuccess(res, index) {
        this.imageUrl = res;
        this.productForm.productImage = "http://img.qgh6.cn/" + res
      },
      uploadFail() {
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.search()
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.search()
      }
    }
  }
</script>

<style scoped>

</style>
