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

    var file_name = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();

    var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
    var minuate = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();

    var time = d.getHours() + ':' + minuate + ':' + second;
    var log_date = "[" + date + " " + time + "]";

    console.log(log_date + " -> " + log_string);

    file_log(log_date + " -> " + log_string + '\n', file_name);
}

module.exports = log;

function file_log(log, file_name) {

    fs.appendFile(path.join(__dirname, "./logs/server-" + file_name + ".log"), log, function(err) {
        if (err)
            console.error(err);
    });
}
