//
// proxy server base
//
// by : elyas
// create : 16/2/95
// edit : 24/2/95

global.init = require('./config.json');

var http = require('http');
var httpProxy = require('http-proxy');

var log = require('./mini_logger');

var proxy = httpProxy.createProxyServer({});

// hande errors
proxy.on('error', function(err) {
    console.error(err);
});


var servers = require('./servers.json');


var server = http.createServer(function(req, res) {


    // if I define this host name proxy it
    if (req.headers.host && servers[req.headers.host]) {

        var host = servers[req.headers.host].proxy_url;

        proxy.web(req, res, {
            target: host
        });

        log('http://' + req.headers.host + '  => ' + host +
            ' / URL -> ' + req.method + ' ' + req.url, req.headers.host);
    } else {
        res.end('404');
        log('http://' + req.headers.host + req.url + " not found", req.headers.host);
    }
});

var port = global.init.main_port || 2525;

log("listening on port " + port);
server.listen(port);
