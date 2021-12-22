let qetag = require("./qetag-node");
let fs = require("fs");

let files = fs.readdirSync('./');//<
for (let i of files) {
    let s = fs.statSync(i);
    if (s.isFile()) {
        qetag.getEtag(i, r => console.log(i, r))
    }
}