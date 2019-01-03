var express = require('express')
var app = express()
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/incoming', secret: 'myHashSecret' })
var shell = require('shelljs')
// 上面的 secret 保持和 GitHub 后台设置的一致

handler.on('error', function(err) {
  console.error('Error:', err.message)
})

handler.on('push', function(event) {
  console.log(
    'Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref
  )
  shell.exec('git fetch --all')
})

app.use(express.static(__dirname + '/dist'))
// var proxy = require('http-proxy-middleware')
// var options = {
//   target: 'http://192.168.2.243:7070', // 测试
//   changeOrigin: true, // 需要虚拟主机站点
//   pathRewrite: {
//     //  '^/ns-index': ''
//   }
// }
// var exampleProxy = proxy(options) //开启代理功能，并加载配置
// app.use('/ns-index', exampleProxy) //对地址为’/‘的请求全部转发
app.listen(9999)
