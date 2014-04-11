define(function (require, exports, module) {
    'use strict';

    require('cmp/lucky');

    var vm = new Vue({
            el: '#app'
        });

    module.exports = vm;
});