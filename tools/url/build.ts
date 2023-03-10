import fs from "fs";
import fetch from "node-fetch";
import { program } from "commander";
import prettier from "prettier";

interface Options {
	spec: string;
	output: string;
}

program
	.requiredOption("--spec <spec-url>")
	.requiredOption("--output <optput-path>");
program.parse();

const formatByPrettier = (sourceCode: string) => {
	return prettier.format(sourceCode, {
		tabWidth: 4,
		useTabs: true,
		arrowParens: "avoid",
		trailingComma: "none",
		parser: "typescript"
	});
};

const options = program.opts() as Options;

const getSpecJSON = async (url: string) => {
	const response = await fetch(url);
	const data = await response.json();

	return data;
};

const main = async (options: Options) => {
	const slackSpecJSON = await getSpecJSON(options.spec);

	const { host, basePath, paths } = slackSpecJSON;
	const baseURL = `https://${host}${basePath}`;

	const operations: {
		operationId: string;
		url: string;
		method: string;
	}[] = [];
	Object.keys(paths).forEach(path => {
		Object.keys(paths[path]).forEach(method => {
			paths[path][method].operationId &&
				operations.push({
					operationId: paths[path][method].operationId,
					url: `${baseURL}${path}`,
					method
				});
		});
	});

	const sourceCode = `
/** 
 * !!!IMPORTANT!!!
 * Do not edit this file manually.
 * This is auto generated source code from swagger definitions.
 */

export const slackUrlDefinitions = {
	${operations
		.map(operation => {
			return `${operation.operationId}: {url: "${operation.url}", method: "${operation.method}" as const}`;
		})
		.join(",")}
}
	`;

	fs.writeFileSync(options.output, formatByPrettier(sourceCode));
};

main(options);
