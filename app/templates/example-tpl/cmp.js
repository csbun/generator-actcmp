define(function (require, exports, module) {
    'use strict';

    var NAME = 'cmp-<%= cmpName %>',
        <%= cmpConstructName %> = Vue.extend({
            methods: {
                // methods
            },
            created: function () {
                this.$cmpName = NAME;
            }
        });

    Vue.component(NAME, <%= cmpConstructName %>);
    module.exports = <%= cmpConstructName %>;
    
});