var express = require('express')

var GithubWebHook = require('express-github-webhook')
var webhookHandler = GithubWebHook({ path: '/webhook', secret: '123456' })
var shell = require('shelljs')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json())
app.use(webhookHandler)
// var webhook = require('./webhook.js')

app.use(express.static(__dirname + '/dist'))
// app.post('/webhook', webhook);
webhookHandler.on('push', function(err, req, res) {
  shell.exec('git fetch --all')
  res.send({result:'git fetch --all'})
})
webhookHandler.on('error', function (err, req, res) {
  console.log(err)
});

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
