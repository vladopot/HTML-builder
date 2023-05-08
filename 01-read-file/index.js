const fs = require("fs");
const {stdout} = process;

const readStream = fs.createReadStream("01-read-file/text.txt", "utf-8");
readStream.on("data", (data) => {
    stdout.write(data);
});