<template>
  <div class="mod-log">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="用户名／用户操作" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%">
	  <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" class="log-table-expand">
            <el-form-item label="ID">
              <span>{{scope.row.id}}</span>
            </el-form-item>
            <el-form-item label="用户名">
              <span>{{scope.row.username}}</span>
            </el-form-item>
            <el-form-item label="用户操作">
              <span>{{scope.row.operation}}</span>
            </el-form-item>
            <el-form-item label="请求方法">
              <span>{{scope.row.method}}</span>
            </el-form-item>
            <el-form-item label="请求参数">
              <span>{{scope.row.params}}</span>
            </el-form-item>
            <el-form-item label="执行时长(毫秒)">
              <span>{{scope.row.time}}</span>
            </el-form-item>
            <el-form-item label="IP地址">
              <span>{{scope.row.ip}}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{scope.row.created}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        width="80"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="username"
        header-align="center"
        align="center"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="operation"
        header-align="center"
        align="center"
        label="用户操作">
      </el-table-column>
      <el-table-column
        prop="method"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="请求方法">
      </el-table-column>
      <el-table-column
        prop="params"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="请求参数">
      </el-table-column>
      <el-table-column
        prop="time"
        header-align="center"
        align="center"
        label="执行时长(毫秒)">
      </el-table-column>
      <el-table-column
        prop="ip"
        header-align="center"
        align="center"
        width="150"
        label="IP地址">
      </el-table-column>
      <el-table-column
        prop="created"
        header-align="center"
        align="center"
        width="180"
        label="创建时间">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageNum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        dataListLoading: false,
        selectionDataList: []
      }
    },
    created () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/log/list'),
          method: 'get',
          params: this.$http.adornParams({
            'pageNum': this.pageNum,
            'pageSize': this.pageSize,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.result.pageList
            this.total = data.result.total
          } else {
            this.dataList = []
            this.total = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageNum = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageNum = val
        this.getDataList()
      }
    }
  }
</script>
<style>
  .log-table-expand {
    font-size: 0;
  }
  .log-table-expand label {
    width: 200px;
    color: #99a9bf;
  }
  .log-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
</style>