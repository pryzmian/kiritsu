import { inject, injectable } from "inversify";
import { RedisClient, Database } from "#kiritsu/structures";
import type { Action, Case } from "@prisma/client";

type CaseOptions = {
    id: string;
    caseId: string;
    user: string;
    moderator: string;
    action: Action;
    reason: string;
};

@injectable()
export class CaseManager {
    @inject(Database) private database!: Database;
    @inject(RedisClient) private cache!: RedisClient;

    public async create(data: CaseOptions): Promise<Case> {
        const newCase = await this.database.case.create({ data });
        await this.cache.addSet<Case>(`guild:${data.id}:cases`, `case:${data.caseId}`, newCase);
        return newCase;
    }
    
    public async edit(caseId: string, reason: string): Promise<Case> {
        const editedCase = await this.database.case.update({ where: { id: caseId }, data: { reason } });
        await this.cache.set<Case>(`case:${caseId}`, editedCase);
        return editedCase;
    }

    public async delete(guildId: string, caseId: string) {
        const caseToDelete = await this.database.case.findUnique({ where: { id: guildId, caseId } });
        if (!caseToDelete) return;

        await this.database.case.delete({ where: { id: guildId } });
        await this.cache.delete(`case:${caseId}`);
        await this.cache.deleteSet(`guild:${caseToDelete.id}:cases`);
    }

    public async get(caseId: string): Promise<Case | null> {
        const cachedCase = await this.cache.get<Case>(`case:${caseId}`);
        if (cachedCase) return cachedCase;
        
        return this.database.case.findUnique({ where: { id: caseId } });
    }

    public async getAll(guildId: string): Promise<Case[]> {
        const cachedCases = await this.cache.getSet<Case>(`guild:${guildId}:cases`);
        if (cachedCases.length) return cachedCases;

        const casesFromDb = await this.database.case.findMany({ where: { id: guildId } });

        for (const singleCase of casesFromDb) {
            await this.cache.addSet<Case>(`guild:${guildId}:cases`, `case:${singleCase.caseId}`, singleCase);
        }

        return casesFromDb;
    }
}