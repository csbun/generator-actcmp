'use strict';

var express = require('express'),
    app = express(),
    data = require('./data');

// 自动注入 livereload
app.use(require('connect-livereload')({
    port: 35729
}));

// 根目录
var basePath = process.cwd() + '/example';
app.use(express.static(basePath));

app.get('/', function (req, res) {
    res.sendfile('./index.html');
});

app.get('/api/read', function (req, res) {
    setTimeout(function() {
        res.send({});
    }, 1000);
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Server listening on port ' + port);
});
