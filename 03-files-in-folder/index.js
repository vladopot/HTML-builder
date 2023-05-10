const fs = require("fs");
const path = require("path");
const {stdin, stdout} = process;

let sizes = [];

console.log(`\n\n`);

fs.readdir('03-files-in-folder/secret-folder', (err, data) => {
    data.forEach((element, i) => {
        fs.stat('03-files-in-folder/secret-folder/'+element, (err, dat) => {
            sizes.push(dat.size);
            console.log(`${path.basename(element).split('.').slice(0, -1).join('.')} - ${path.extname(element).slice(1)} - ${sizes[i] * 0.001} kB`);
        });
    });
});