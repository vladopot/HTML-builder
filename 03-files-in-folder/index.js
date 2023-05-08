const fs = require("fs");
const path = require("path");

fs.readdir('03-files-in-folder/secret-folder', (err, data) => {
    data.forEach(element => {
        console.log(`${path.basename(element).split('.').slice(0, -1).join('.')} - ${path.extname(element).slice(1)} - ${fs.statSync('03-files-in-folder/secret-folder/'+element).size * 0.001}kB`);
    });
});