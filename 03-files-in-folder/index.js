const fs = require("fs");
const path = require("path");
const {stdin, stdout} = process;

console.log(`\n\n`);

fs.readdir('03-files-in-folder/secret-folder', (err, data) => {
    let size = '';
    let name = '';
    let extname = '';
    data.forEach((element, i) => {
        fs.stat(`03-files-in-folder/secret-folder/${element}`, (err, el) => {
            if (!el.isDirectory()) {
                fs.stat('03-files-in-folder/secret-folder/'+element, (err, dat) => {
                    size = dat.size;
                    name = path.basename(element).split('.').slice(0, -1).join('.');
                    extname = path.extname(element).slice(1);
                    logger(name, extname, size);
                });
            }
        })
    });
});

function logger(name, extname, size) {
    console.log(`${name} - ${extname} - ${size * 0.001} kB`);
}