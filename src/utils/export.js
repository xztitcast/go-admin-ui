import Vue from 'vue'
import axios from 'axios'

/**
* 导出数据通用方法
* @param {*} url 请求地址
* @param {*} params 参数
*/
export function exportExcel (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url,
      params: params,
      responseType: 'blob',
      timeout: 30000,
      headers: {
        token: Vue.cookie.get('token')
      }
    }).then(res => {
      let blob = new Blob([res.data])
      let reader = new FileReader()
      reader.onload = e => {
        let result = e.target.result
        if (result.indexOf('msg') > -1) {
          // 返回有错误消息时候才解析
          console.log(result)
          let res = JSON.parse(result)
          this.$message.error(res.msg)
          reject(res)
        } else {
          this.$message({
            message: '导出成功',
            type: 'success'
          })
          resolve(res)
        }
      }
      reader.readAsText(blob)
      // resolve(res);
    }).catch(error => {
      this.$message.error('导出失败')
      reject(error)
    })
  })
}
