//
// proxy server base
//
// by : elyas
// create : 16/2/95

global.init = require('./config.json');

var http = require('http');
var httpProxy = require('http-proxy');
var log = require('./mini_logger');

var proxy = httpProxy.createProxyServer({});

// hande errors
proxy.on('error', function(err) {
    console.log(err);
});

var servers = {
    "localhost:2526": {
        proxy_url: "http://timing.kiaan.org"
    }
};

var server = http.createServer(function(req, res) {

    // console.log(req);

    // if I define this host name proxy it
    if (req.headers.host && servers[req.headers.host]) {


        var host = servers[req.headers.host].proxy_url;

        proxy.web(req, res, {
            target: host
        });

        log('http://' + req.headers.host + '  => ' + host +
            ' / URL ->' + req.url + ' / method -> ' + req.method);
    } else {
        // TODO render some ting here
        log('http://' + req.headers.host + req.url + " not found");
    }

});

var port = global.init.main_port || 2525;

log("listening on port " + port);
server.listen(port);
