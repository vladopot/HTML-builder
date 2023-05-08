const fs = require("fs");
const path = require("path");

fs.stat("05-merge-styles/project-dist/bundle.css", (err, data) => {
    if (!err) {
        fs.unlink("05-merge-styles/project-dist/bundle.css", () => {
            fs.writeFile("05-merge-styles/project-dist/bundle.css", "", () => {});
        });
    } else {
        fs.writeFile("05-merge-styles/project-dist/bundle.css", "", () => {});
    }
});

fs.readdir("05-merge-styles/styles", (err, file) => {
    file.forEach( (e) => {
        if (path.extname(e) !== ".css") {
            return;
        } else {
            fs.readFile(`05-merge-styles/styles/${e}`, "utf8", (err, data) => {
                fs.appendFile("05-merge-styles/project-dist/bundle.css", `${data}\n\n`, () => {});
            });
        }
    });
});
