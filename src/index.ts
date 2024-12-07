process.loadEnvFile();
import "reflect-metadata";

import { container } from "#kiritsu/inversify";
import { KiritsuClient, Database } from "#kiritsu/structures";

await container.get(KiritsuClient).init();
await container.get(Database).connect();