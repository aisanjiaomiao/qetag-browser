# qetag-browser

**qetag-browser** 是基于七牛云 [qetag](https://github.com/qiniu/qetag) 算法原理编写的浏览器端 [qetag](https://github.com/qiniu/qetag) 实现

### 说明

- [qetag-browser](qetag-browser.js):原生`<script src="qetag-browser.js"></script>`方式引用
- [qetag-browser.esm](qetag-browser.esm.js):ES Module`import qetag from './qetag-browser.esm'`方式引用
- [qetag-node](qetag-node.js):nodejs 端`const qetag = require("./qetag-node");`主要是为了做对比参考使用才放进项目中

### 使用:

> 此库依赖**sha1**算法库默认使用[js-sha1](https://github.com/emn178/js-sha1)库进行 sha1 计算

- `qEtag.get(ArrayBuffer)`:计算 qetag
- `qEtag.concatArr2Uint8(Array,totalLength)`:类似 node 端的`Buffer.concat`效果,
- `qEtag.uint8ToBase64(Uint8Array,Boolean:url_safe)`:这里的 url*safe 编码,在传统 base64 编码中会出现`+`、`/`两个会被 url 直接转义的符号，因此如果希望通过 url 传输这些编码字符串，需要先做传 base64 编码，随后将`+`和`/`分别替换为`-`、`*`

- 基础示例查看:[demo.html](demo.html)

代码相对简单，小伙伴完全可以根据需求自行修改
