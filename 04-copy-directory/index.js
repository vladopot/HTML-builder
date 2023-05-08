let fs = require('fs');
const path = require("path");

fs.stat("04-copy-directory/files-copy", (err, data) => {
    if (!err) {
        return;
    } else {
        fs.mkdir("04-copy-directory/files-copy", (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
    }
});

fs.readdir("04-copy-directory/files", (err, data) => {
    data.forEach(element => {
        fs.copyFile(`04-copy-directory/files/${element}`, `04-copy-directory/files-copy/${element}`, err => {
            if (err) throw err;
        });
    });
});