var path    = require("path");
var express = require("express");
var app = express();

// List of Months
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Homepage
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

// Favicon error fix
app.get('/favicon.ico', function(res, res) {
    res.end();
});

// API
app.get('/:date', function(req, res) {
    var parm = req.params.date;
    parm = /^\d+$/.test(parm) ? parseInt(parm) * 1000 : parm;
    var date = new Date(parm);
    var result = {
        unix: null,
        natural: null
    };
    
    if(!isNaN(date)) {
        result.unix = Math.floor(date.getTime() / 1000 | 0);
        result.natural = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    }
    res.json(result);
});

app.listen(8080);