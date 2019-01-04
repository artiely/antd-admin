var createHandler = require('github-webhook-handler');
var handler = createHandler({ path: '/webhook', secret: "123456" });
var shell = require('shelljs')

module.exports = function(req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  });

  handler.on('error', function (err) {
    console.error('Error:', err.message);
  });

  handler.on('push', function (event) {
    shell.exec('git fetch --all')
    //  var comps = event.payload.ref.split('/');
    //  if (comps[2] != 'production') {
    //    console.log('Received a push on %s and no build has is triggered', comps[2]);
    //    return;
    //  }
    //  console.log('Received a push on production, build started...');
    //  exec('./scripts/deploy', function(error, stdout, stderr) {
    //    console.log(stdout);
    //    if (error != null) {
    //      console.log('Error during the execution of redeploy: ' + stderr);
    //    }
    //  });
   });
};