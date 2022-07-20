<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="150px">
      <el-form-item label="参数(Name)名称" prop="paramName">
        <el-input v-model="dataForm.paramName" placeholder="请输入参数(Name)名称"></el-input>
      </el-form-item>
      <el-form-item label="参数(Key)键" prop="paramKey">
        <el-input v-model="dataForm.paramKey" placeholder="请输入参数(Key)键"></el-input>
      </el-form-item>
      <el-form-item label="参数（Value）值" prop="paramVal">
        <el-input v-model="dataForm.paramVal" placeholder="请输入参数(Value)值"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          paramKey: '',
          paramName: '',
          paramVal: '',
          remark:''
        },
        dataRule: {
          paramName:[
            { required: true, message: '参数(Name)名称不能为空', trigger: 'blur' }
          ],
          paramKey: [
            { required: true, message: '参数(Key)键不能为空', trigger: 'blur' }
          ],
          paramVal: [
            { required: true, message: '参数(Value)值不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/config/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.paramKey = data.result.paramKey
                this.dataForm.paramName = data.result.paramName
                this.dataForm.paramVal = data.result.paramVal
                this.dataForm.remark = data.result.remark
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/config/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'paramKey': this.dataForm.paramKey,
                'paramName': this.dataForm.paramName,
                'paramVal': this.dataForm.paramVal,
                'remark': this.dataForm.remark
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
