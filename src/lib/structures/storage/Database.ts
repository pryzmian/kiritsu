import { PrismaClient } from "@prisma/client";
import { KiritsuClient } from "#kiritsu/structures";
import { inject, injectable } from "inversify";

@injectable()
export class Database extends PrismaClient {
    @inject(KiritsuClient) private readonly client!: KiritsuClient;

    public connect(): Promise<void> {
        return this.$connect().then(() => {
            this.client.logger.info("Connected to the database.");
        });
    }

    public disconnect(): Promise<void> {
        return this.$disconnect().then(() => {
            this.client.logger.info("Disconnected from the database.");
        });
    }
}