let fs = require('fs');
const path = require("path");

fs.readdir("04-copy-directory/files-copy", (err, f) => {
    f.forEach(element => {
        fs.unlink(`04-copy-directory/files-copy/${element}`, () => {});
    });
});
fs.rmdir("04-copy-directory/files-copy", () => {});
fs.mkdir("04-copy-directory/files-copy", () => {});

fs.readdir("04-copy-directory/files", (err, data) => {
    data.forEach(element => {
        fs.copyFile(`04-copy-directory/files/${element}`, `04-copy-directory/files-copy/${element}`, err => {
            if (err) throw err;
        });
    });
});

