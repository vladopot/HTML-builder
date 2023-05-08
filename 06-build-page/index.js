const fs = require("fs");
const path = require("path");

fs.mkdir("06-build-page/project-dist", () => {
    fs.writeFile("06-build-page/project-dist/index.html", "", () => {})
});

fs.readFile("06-build-page/template.html", "utf8", (err, text) => {
    fs.appendFile("06-build-page/project-dist/index.html", text, () => {});
});

fs.readdir("06-build-page/components", (err, file) => {
    file.forEach( (e) => {
        console.log(e);
    });
});