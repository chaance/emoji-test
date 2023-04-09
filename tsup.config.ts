// import fs from "node:fs";
// import path from "node:path";
import { defineConfig, type Options } from "tsup";
import pkgJson from "./package.json";

let { name: packageName, version: packageVersion } = pkgJson;

export default defineConfig((options) => {
	let target: Options["target"] = "es2019";
	let entry: Options["entry"] = ["src/emoji-test.ts"];

	let banner = createBanner({
		author: "Chance Strickland",
		creationYear: 2022,
		license: "MIT",
		packageName,
		version: packageVersion,
	});

	return [
		// cjs.dev.js
		{
			entry,
			format: "cjs",
			sourcemap: true,
			banner: { js: banner },
			target,
			outExtension({ format }) {
				return {
					js: `.${format}.dev.js`,
				};
			},
		},

		// cjs.prod.js
		{
			entry,
			format: "cjs",
			sourcemap: true,
			banner: { js: banner },
			target,
			minify: true,
			outExtension({ format }) {
				return {
					js: `.${format}.prod.js`,
				};
			},
		},

		// esm + d.ts
		{
			entry,
			format: "esm",
			sourcemap: true,
			banner: { js: banner },
			target,
			dts: { banner },
			outExtension({ format }) {
				return {
					js: `.${format}.js`,
				};
			},
		},

		// esm.prod
		{
			entry,
			format: "esm",
			sourcemap: true,
			banner: { js: banner },
			target,
			minify: true,
			outExtension({ format }) {
				return {
					js: `.${format}.prod.js`,
				};
			},
		},
	];
});

function createBanner({
	packageName,
	version,
	author,
	license,
	creationYear,
}: {
	packageName: string;
	version: string;
	author: string;
	license: string;
	creationYear: string | number;
}) {
	let currentYear = new Date().getFullYear();
	let year =
		currentYear === Number(creationYear)
			? currentYear
			: `${creationYear}-${currentYear}`;

	return `/**
 * ${packageName} v${version}
 *
 * Copyright (c) ${year}, ${author}
 *
 * This source code is licensed under the ${license} license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @license ${license}
 */
`;
}
