import { migrateAllPlatforms, migratePlatform } from "./migrate-platform-workspace.mjs";
import { validatePlatformWorkspace } from "./lib/platform-workspace-validator.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export { migrateAllPlatforms, migratePlatform, validatePlatformWorkspace };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const isMain = process.argv[1] === fileURLToPath(import.meta.url);

if (isMain) {
  const { errors, ok } = validatePlatformWorkspace(rootDir);
  if (!ok) {
    console.error("Platform workspace validation failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }
  console.log("Platform workspace validation passed.");
}
