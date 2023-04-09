import path from "node:path";
import process from "node:process";
import fse from "fs-extra";

const { writeFile } = fse;
const distPath = path.join(process.cwd(), "dist");
const packageName = "emoji-test";

main();

async function main() {
	await writeFile(
		path.resolve(distPath, `${packageName}.cjs.js`),
		getCjsContents(packageName)
	);
	console.log("Success!!");
}

function getCjsContents(name) {
	return `"use strict";

if (process.env.NODE_ENV === "production") {
	module.exports = require("./${name}.cjs.prod.js");
} else {
	module.exports = require("./${name}.cjs.dev.js");
}
`;
}
