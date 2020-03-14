import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: "/sell", // api的base_url
  timeout: 200000, // 10s请求超时时间
  headers: { 'Content-Type': 'application/json; charset=UTF-8' },
})

export default service
