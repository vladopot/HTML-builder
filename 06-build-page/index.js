const fs = require("fs");
const path = require("path");
let textTemplate = ``;
let articles = ``;
let footer = ``;
let header = ``;

fs.mkdir("06-build-page/project-dist", () => {
    fs.writeFile("06-build-page/project-dist/index.html", "", () => {})
});

fs.readdir("06-build-page/project-dist/assets", (err, f) => {
    f.forEach(element => {
        fs.unlink(`06-build-page/project-dist/assets/${element}`, () => {});
    });
});
fs.rmdir("06-build-page/project-dist/assets", () => {});
fs.mkdir("06-build-page/project-dist/assets", () => {});

fs.readdir("06-build-page/assets", (err, data) => {
    data.forEach(element => {
        fs.copyFile(`06-build-page/assets/${element}`, `06-build-page/project-dist/assets/${element}`, err => {
            if (err) throw err;
        });
    });
});

fs.stat("06-build-page/project-dist/style.css", (err, data) => {
    if (!err) {
        fs.unlink("06-build-page/project-dist/style.css", () => {
            fs.writeFile("06-build-page/project-dist/style.css", "", () => {});
        });
    } else {
        fs.writeFile("06-build-page/project-dist/style.css", "", () => {});
    }
});

fs.readdir("06-build-page/styles", (err, file) => {
    file.forEach( (e) => {
        if (path.extname(e) !== ".css") {
            return;
        } else {
            fs.readFile(`06-build-page/styles/${e}`, "utf8", (err, data) => {
                fs.appendFile("06-build-page/project-dist/style.css", `${data}\n\n`, () => {});
            });
        }
    });
});

fs.readFile("06-build-page/template.html", "utf8", (err, text) => {
    textTemplate = text;
    collector();
});

function collector () {
    fs.readdir("06-build-page/components", (err, data) => {
        data.forEach(e => {
            fs.readFile(`06-build-page/components/${e}`, "utf8", (err, t) => {
                if (e === "articles.html") {
                    articles = t;
                } else if (e === "header.html") {
                    header = t;
                } else {
                    footer = t;
                }
                collector2(e);
            })
        });
        
    });
}

function collector2 (arg) {
    if (arg === "articles.html") {
        textTemplate = textTemplate.replace('{{articles}}', articles);
    } else if (arg === "header.html") {
        textTemplate = textTemplate.replace('{{header}}', header);
    } else {
        textTemplate = textTemplate.replace('{{footer}}', footer);
    }
    fs.writeFile("06-build-page/project-dist/index.html", textTemplate, () => {});
}
