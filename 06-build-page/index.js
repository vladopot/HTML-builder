const fs = require("fs");
const path = require("path");
const rimraf = require('rimraf');
let textTemplate = ``;
let articles = ``;
let footer = ``;
let header = ``;
let templateTags = [];
let dirToCopy = "06-build-page/assets";
let targetDir = "06-build-page/project-dist/assets";
let project_dist = "06-build-page/project-dist";
start();

function start () {
    fs.stat(`${project_dist}`, (err) => {
        if (!err) {
            deleter(project_dist);
        } else {
            creator();
            str();
        }
    })
}

function deleter(dir) {
    rimraf(dir, () => {
        creator();
        str()
    });
}

function creator () {
    fs.mkdir("06-build-page/project-dist", () => {
        fs.writeFile("06-build-page/project-dist/index.html", "", () => {})
    });
    fs.mkdir("06-build-page/project-dist/assets", () => {
        copyingFile(dirToCopy, targetDir);
    });
}

function copyingFile (dirStart, dirEnd) {
    fs.readdir(dirStart, (err, data) => {
        data.forEach(element => {
            if (!fs.lstatSync(`${dirStart}/${element}`).isDirectory()) {
                fs.copyFile(`${dirStart}/${element}`, `${dirEnd}/${element}`, () => {});
            } else {
                fs.mkdir(`${dirEnd}/${element}`, () => {});
                copyingFile(`${dirStart}/${element}`, `${dirEnd}/${element}`);
            }
        });
    });
}
function str() {
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
        templateTags = (text.match(/(?<=\{{2}).+?(?=\}{2})/g));
        collector();
    });
}


function collector () {
    fs.readdir("06-build-page/components", (err, data) => {
        data.forEach(e => {
            fs.readFile(`06-build-page/components/${e}`, "utf8", (err, t) => {
                collector2(path.basename(e).split('.').slice(0, -1).join('.'), t);
            })
            
        });
        
    });
}

function collector2 (arg, text) {
    templateTags.forEach(e => {
        if (e === `${arg}`) {
            textTemplate = textTemplate.replace(`{{${e}}}`, text);
        }
    });
    fs.writeFile("06-build-page/project-dist/index.html", '', () => {
        fs.writeFile("06-build-page/project-dist/index.html", textTemplate, () => {});
    });
}
