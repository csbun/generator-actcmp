活动项目 Vue 组件 - <%= _.slugify(cmpName) %>
===

依赖
---

- Vue.js
- net.js

安装
---

```
yo act:cmp <%= _.slugify(cmpName) %>
```

示例
---

html

```
    <article id="app">
        <h1>cmp-<%= _.slugify(cmpName) %></h1>
        <section v-component="cmp-<%= _.slugify(cmpName) %>">
        </section>
    </article>
```

js

```
require('cmp/<%= _.slugify(cmpName) %>');
var vm = new Vue({
    el: '#app'
});
```

配置
---

### cmp-<%= _.slugify(cmpName) %>-sth
与 `v-component="cmp-<%= _.slugify(cmpName) %>"` 写在同一个标签，表示 Something

数据
---
### sth
type，解释


方法
---
### sth
解释


事件
---
### cmp-<%= _.slugify(cmpName) %>-sth
解释，传递N个参数：`arg` 解释
