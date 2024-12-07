var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject, injectable } from "inversify";
import { RedisClient, Database } from "#kiritsu/structures";
let CaseManager = class CaseManager {
    database;
    cache;
    async create(data) {
        const newCase = await this.database.case.create({ data });
        await this.cache.addSet(`guild:${data.id}:cases`, `case:${data.caseId}`, newCase);
        return newCase;
    }
    async edit(caseId, reason) {
        const editedCase = await this.database.case.update({ where: { id: caseId }, data: { reason } });
        await this.cache.set(`case:${caseId}`, editedCase);
        return editedCase;
    }
    async delete(guildId, caseId) {
        const caseToDelete = await this.database.case.findUnique({ where: { id: guildId, caseId } });
        if (!caseToDelete)
            return;
        await this.database.case.delete({ where: { id: guildId } });
        await this.cache.delete(`case:${caseId}`);
        await this.cache.deleteSet(`guild:${caseToDelete.id}:cases`);
    }
    async get(caseId) {
        const cachedCase = await this.cache.get(`case:${caseId}`);
        if (cachedCase)
            return cachedCase;
        return this.database.case.findUnique({ where: { id: caseId } });
    }
    async getAll(guildId) {
        const cachedCases = await this.cache.getSet(`guild:${guildId}:cases`);
        if (cachedCases.length)
            return cachedCases;
        const casesFromDb = await this.database.case.findMany({ where: { id: guildId } });
        for (const singleCase of casesFromDb) {
            await this.cache.addSet(`guild:${guildId}:cases`, `case:${singleCase.caseId}`, singleCase);
        }
        return casesFromDb;
    }
};
__decorate([
    inject(Database),
    __metadata("design:type", Database)
], CaseManager.prototype, "database", void 0);
__decorate([
    inject(RedisClient),
    __metadata("design:type", RedisClient)
], CaseManager.prototype, "cache", void 0);
CaseManager = __decorate([
    injectable()
], CaseManager);
export { CaseManager };
