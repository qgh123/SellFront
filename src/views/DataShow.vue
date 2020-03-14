<template>
    <div>
      <div class="container">
        <el-container style="height: 100vh; border: 1px solid #eee">
          <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu
              :default-openeds="['1','2','2-1']"
              router
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <!--<el-submenu index="1">
                <template slot="title">客户管理</template>
                <el-menu-item index="/customerManage">客户管理</el-menu-item>
              </el-submenu>-->
              <el-submenu index="2">
                <template slot="title">菜单</template>
                <el-menu-item-group>
                  <el-menu-item index="/category">类别</el-menu-item>
                  <el-menu-item index="/product">菜品</el-menu-item>
                  <!--<el-submenu index="2-1">
                    <template slot="title">启信宝</template>
                    <el-menu-item index="/qixinbao">启信宝1</el-menu-item>
                    <el-menu-item index="/qixinbao2">启信宝2</el-menu-item>
                  </el-submenu>-->
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-aside>

          <el-container>
            <!--<el-header style="text-align: right; font-size: 12px;background-color: rgb(238, 241, 246)">
              <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>查看</el-dropdown-item>
                  <el-dropdown-item>新增</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-header>-->

            <el-main>
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
      </div>
    </div>
</template>

<script>
  export default {
      name: "DataShow",
      data() {
        return {
        }
      },
      methods: {
      }
    }
</script>

<style scoped>
  .container {
    height: 80vh;
  }
</style>
