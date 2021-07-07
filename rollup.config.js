import typescript from "@rollup/plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";
import commonjs from "@rollup/plugin-commonjs";

const config = {
	input: "src/index.ts",
	output: ["cjs", "esm"].reduce((prev, format) => {
		let outputOptions = ["production", "development"].map((env) => {
			let outputName = ["dist/emoji-test", format, env, "js"]
				.filter(Boolean)
				.join(".");
			return {
				file: outputName,
				format,
				sourcemap: true,
				exports: "named",
				esModule: true,
				freeze: false,
			};
		});

		return [...prev, ...outputOptions];
	}, []),
	plugins: [
		typescript({
			exclude: [
				"**/*.spec.ts",
				"**/*.test.ts",
				"**/*.spec.tsx",
				"**/*.test.tsx",
			],
		}),
		commonjs(),
		sourceMaps(),
	],
};

export default config;
