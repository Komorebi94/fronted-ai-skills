import { validateWorkspace } from "./lib/cursor-workspace-validator.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const strict = process.argv.includes("--strict");

const { errors, warnings, ok } = validateWorkspace(rootDir, { strict });

if (warnings.length > 0) {
  console.warn("Cursor workspace validation warnings:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

if (!ok) {
  console.error("Cursor workspace validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Cursor workspace validation passed.");
