'use strict';

var path = require('path'),
    express = require('express'),
    browserify = require('browserify'),
    debowerify = require('debowerify'),
    app = express();

// 自动注入 livereload 和 weinre
var livereloadPort = 35729,
    genScript = function (src) {
        return src ? '<script src="' + src + '"><\\/script>' : '';
    },
    snippet = '\n<script>//<![CDATA[\ndocument.write(\'' +
        genScript('//\' + (location.hostname || \'localhost\') + \':' + livereloadPort + '/livereload.js') +
        '\')\n//]]></script>\n';

app.use(require('connect-inject')({
    snippet: snippet
}));

// 根目录
var basePath = process.cwd() + '/example';
app.use(express.static(basePath));

app.get('/', function (req, res) {
    res.sendfile('./index.html');
});
app.get('/bundle.js', function (req, res) {
    res.set('Content-Type', 'application/javascript');
    browserify(
        path.join(basePath, 'bootstrap.js'),
        { debug: true }
    )
    .transform(debowerify)
    .bundle(function (err, buff) {
        res.send(err ? 'console.log(' + JSON.stringify(err.message) + ');' : buff.toString());
    });
});

function logHandler (req, res) {
    console.log(req.query);
    res.send({});
}

app.get('/log', logHandler);
app.get('/logVisit', logHandler);
app.get('/logClick', logHandler);
app.get('/logEvent', logHandler);
app.get('/logSystem', logHandler);

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
