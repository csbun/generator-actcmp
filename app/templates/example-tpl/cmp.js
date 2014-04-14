define(function (require, exports, module) {
    'use strict';

    var Cmp = Vue.extend({
            methods: {},
            created: function () {
                this.$cmp = {};
            }
        });

    Vue.component('cmp-<%= _.slugify(cmpName) %>', Cmp);
    module.exports = Cmp;
    
});