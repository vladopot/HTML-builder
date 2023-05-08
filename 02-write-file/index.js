const fs = require("fs");
const path = require('path');
const { exit } = require("process");
const { stdin, stdout } = process;
const writeStream = fs.createWriteStream("02-write-file/writedFile.txt");
const readStream = fs.createReadStream("02-write-file/writedFile.txt", "utf8");
stdout.write("Введите че-нить)\n");
process.on('SIGINT', () => {
    stdout.write('Удачи!');
    process.exit();
});
stdin.on("data", data => {
    if (!String(data).indexOf("exit")) {
        stdout.write('Удачи!');
        process.exit();
    } else {
        writeStream.write(data.toString());
    }
});
