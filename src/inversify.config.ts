import { Container, decorate, injectable } from "inversify";
import { Client, Command, SubCommand } from "seyfert";
import { KiritsuClient, Database, RedisClient } from "#kiritsu/structures";
import { CaseManager } from "#kiritsu/modules";

const container = new Container({ skipBaseClassChecks: true });

decorate(injectable(), Client);
decorate(injectable(), Command);
decorate(injectable(), SubCommand);

container.bind(KiritsuClient).toSelf().inSingletonScope();
container.bind(Database).toSelf().inSingletonScope();
container.bind(RedisClient).toSelf().inSingletonScope();
container.bind(CaseManager).toSelf().inSingletonScope();

export { container };