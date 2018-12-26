// 配置开发和生产的请求地址
const isProduction = process.env.NODE_ENV === 'production'
const BASE_URL = isProduction ? '' : ''
export default BASE_URL
