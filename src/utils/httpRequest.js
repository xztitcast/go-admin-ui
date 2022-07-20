import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import merge from 'lodash/merge'
import { clearLoginInfo } from '@/utils'

const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {}
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  config.headers['Authorization'] = 'Bearer' + Vue.cookie.get('jwt')
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  if (response.data && response.data.code === 401) { // 401, token失效
    clearLoginInfo()
    router.push({ name: 'login' })
  }
  return response
}, error => {
  return Promise.reject(error)
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  return actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
    't': new Date().getTime()
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, contentType = 'json') => {
  if(contentType === 'form'){
    let form = new FormData()
    for(var i = 0;i < data.length; i++){
      form.append(data[i].key, data[i].value)
    }
    http.defaults.headers['Content-Type'] = 'multipart/form-data'
    return form
  }
  if(contentType === 'urlencoded'){
    http.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return qs.stringify(data)
  }
  http.defaults.headers['Content-Type'] = 'application/json; charset=utf-8'
  return JSON.stringify(data)
}

export default http
