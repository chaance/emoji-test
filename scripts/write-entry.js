const path = require("path");
const { writeFile } = require("fs/promises");

const distPath = path.resolve(__dirname, "../dist");
const packageName = "emoji-test";

writeCjs();

async function writeCjs() {
	try {
		await writeFile(
			path.resolve(distPath, `${packageName}.cjs.js`),
			getCjsContents(packageName)
		);
		console.log("Success!!");
	} catch (err) {
		// TODO:
		console.log("Error!!");
		console.error(err);
	}
}

function getCjsContents(name) {
	return `'use strict';

if (process.env.NODE_ENV === "production") {
	module.exports = require("./${name}.cjs.production.js");
} else {
	module.exports = require("./${name}.cjs.development.js");
}
`;
}
