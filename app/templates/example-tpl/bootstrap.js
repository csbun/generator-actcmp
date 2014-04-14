define(function (require, exports, module) {
    'use strict';

    require('cmp/<%= _.slugify(cmpName) %>');

    var vm = new Vue({
            el: '#app'
        });

    module.exports = vm;
});