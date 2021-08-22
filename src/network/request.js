import axios from 'axios'

// 该项目所有请求均为 get请求
export function request(url, params) {
  // 请求超过30秒则判定为超时
  const instance = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 30000,
      withCredentials: true,
  });

  // axios拦截器
  // 请求拦截
  instance.interceptors.request.use(config => {
      // console.log('请求拦截器');
      return config
  }, err => {
      console.log(err);
  });

  instance.defaults.withCredentials = true;

  if (params) {
      params = {
          params: params
      }
      return instance.get(url, params)
  } else {
      return instance.get(url)
  }

}
// export function request(config) {
//   // 1.创建axios的实例
//   const instance = axios.create({
//     baseURL: 'http://localhost:3000',
//     timeout: 5000
//   })

//   // 发送真正的网络请求
//   instance(config.baseConfig)
//     .then(res => {
//       // console.log(res);
//       config.success(res);
//     })
//     .catch(err => {
//       // console.log(err);
//       config.failure(err)
//     })
// }
// // 项目中同一模块下的接口是可以统一管理的，新建一个文件夹
// // 引入axios
 
// import request from '../network/axios'
 
// // get方法(prodata为形参，名字随便起)
// export function carlist(prodata) {
//   return request({
//     url: '/base/vehicle',
//     method: 'get',
//     params: prodata
//   })
// }
 
// // post方法(data即  data: data)
// export function addMsg(data) {
//   return request({
//     url: '/alarm/record/contentModle',
//     method: 'post',
//     data
//   })
// }
 
// // put方法
// export function driverStatus(params) {
//   return request({
//     url: `/event/${params.id}?status=${params.status}`,
//     method: 'put'
//   })
// }
 
// // delete方法
// export function deleteMsg(id) {
//   return request({
//     url: `/alarm/record/contentModle/${id}`,
//     method: 'delete'
//   })
// }
// export function cloudSearch(keywords) {
//   return request({
//     url: '/cloudsearch',
//     method: 'get',
//     params:{
//       keywords:keywords
//     }
//   })
// }
