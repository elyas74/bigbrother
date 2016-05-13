//
// log with date
//
// by : elyas
// create : 24/2/95

var fs = require('fs');
var path = require('path');

function log(log_string, host) {
    var d = new Date();

    var date = d.getFullYear() + '/' + d.getMonth() + '/' + d.getDate();

    var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
    var minuate = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();

    var time = d.getHours() + ':' + minuate + ':' + second;
    var log_date = "[" + date + " " + time + "]";

    console.log(log_date + " -> " + log_string);
    file_log(log_date + " -> " + log_string + '\n', host);
}

module.exports = log;

function file_log(log, host) {
    fs.appendFile(path.join(__dirname, "./server.log"), log, function(err) {
        if (err) return console.error(err);
    });

    if (host)
        fs.appendFile(path.join(__dirname, "./server-" + host + ".log"), log, function(err) {
            if (err) return console.error(err);
        });
}
