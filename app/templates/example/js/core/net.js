define(function (require, exports) {
    'use strict';

    var entryMatches = location.search.match(/[?|&]entry=([^&]*)(&|$)/),
        entry = entryMatches ? entryMatches[1] : '';

    function ucParam(url) {
        url += (url.indexOf('?') >= 0 ? '&' : '?') +
            'entry=' + entry +
            '&uc_param_str=dnfrpfbivesscpgimibtbmntnisieijblauputog';
        return url;
    }

    function ajax(options) {
        options = options || {};
        var type = options.type || 'GET',
            url = options.url || '',
            params = options.data,
            success = options.success,
            error = options.error,
            xhr = new XMLHttpRequest(),
            paramsArr = [],
            p;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (success) {
                        success(JSON.parse(xhr.responseText));
                    }
                }
                else if (error) {
                    error();
                }
            }
        };
        for (p in params) {
            if (params.hasOwnProperty(p) && typeof params[p] !== 'function') {
                paramsArr.push(p + '=' + encodeURIComponent(params[p]));
            }
        }
        type = type.toUpperCase() === 'POST' ? 'POST' : 'GET';
        try {
            if (type === 'POST') {
                xhr.open(type, ucParam(url), true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.send(paramsArr.join('&'));
            }
            else {
                xhr.open(type, ucParam(url) + '&' + paramsArr.join('&'), true);
                xhr.send();
            }
        }
        catch (e) {
            console.error('ajax error', e);
            // do nothing
        }
    }

    function typeAjax(type) {
        return function (url, params, success, error) {
            ajax({
                type: type,
                url: url,
                data: params,
                success: success,
                error: error
            });
        };
    }

    exports.ucParam = ucParam;
    exports.ajax = ajax;
    exports.get = typeAjax('GET');
    exports.post = typeAjax('POST');

    exports.ping = function (url) {
        var img = new Image();
        img.src = ucParam(url) + '&_t=' + (+new Date());
    };
});