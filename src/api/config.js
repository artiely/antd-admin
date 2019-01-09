// 配置开发和生产的请求地址
const isProduction = process.env.NODE_ENV === 'production'
const BASE_URL = isProduction ? 'http://120.78.174.212:8001/ucar' : '/ucar'
export default BASE_URL
