/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { join, dirname } from "path";
import recursiveReadSync from "recursive-readdir-sync";
import { pascalCase } from "change-case";
import {
  quicktype,
  InputData,
  JSONSchemaInput,
  FetchingJSONSchemaStore,
  SerializedRenderResult,
} from "quicktype-core";
import { mkdirSync, writeFileSync } from "fs";

/**
 * Create TS type from a JSON Schema
 *
 * Taken from https://github.com/quicktype/quicktype
 */
export async function quicktypeJSONSchema(
  typeName: string,
  jsonSchemaString: string
): Promise<SerializedRenderResult> {
  const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore());

  // We could add multiple schemas for multiple types,
  // but here we're just making one type from JSON schema.
  await schemaInput.addSource({ name: typeName, schema: jsonSchemaString });

  const inputData = new InputData();
  inputData.addInput(schemaInput);

  return quicktype({
    alphabetizeProperties: true,
    inputData,
    leadingComments: [],
    lang: "TypeScript",
    indentation: "  ",
    rendererOptions: {
      "just-types": true as any,
      "runtime-typecheck": false as any,
    },
  });
}

export default async function codegen(): Promise<void> {
  // Get the files
  const sourceFiles = recursiveReadSync(join(__dirname, "../sources/"));

  // Filter to only json files
  const filteredSourceFiles = sourceFiles.filter(
    (path: string) => path.endsWith(".json") || path.endsWith(".jsonc")
  );

  // Process each
  for (const path of filteredSourceFiles) {
    console.log(path);

    const json = require(path);
    const typeName = pascalCase(json.title);
    console.log(typeName);

    // Get the schema
    const schema = await quicktypeJSONSchema(typeName, JSON.stringify(json));

    // Get the new file name
    const typesPath = path
      .replace(
        join(__dirname, "../sources/"),
        join(__dirname, "../sourceTypes/")
      )
      .replace(".json", ".ts");

    // Make the directory if it doesn't exist
    mkdirSync(dirname(typesPath), { recursive: true });

    // Write the types file
    writeFileSync(typesPath, schema.lines.join("\n"), "utf8");

    console.log(typesPath);
  }
}

codegen();
