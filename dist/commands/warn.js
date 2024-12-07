var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject } from "inversify";
import { Command, Declare } from "seyfert";
import { CaseManager } from "#kiritsu/modules";
import { randomUUID } from "node:crypto";
let WarnCommand = class WarnCommand extends Command {
    caseManager;
    async run(ctx) {
        await this.caseManager.create({
            action: "Warn",
            caseId: randomUUID(),
            id: ctx.guildId,
            moderator: ctx.author.id,
            reason: "ganyu supremacy",
            user: ctx.author.id,
        });
        await this.caseManager.create({
            action: "Warn",
            caseId: randomUUID(),
            id: ctx.guildId,
            moderator: ctx.author.id,
            reason: "ganyu supremacy",
            user: ctx.author.id,
        });
        await this.caseManager.create({
            action: "Warn",
            caseId: randomUUID(),
            id: ctx.guildId,
            moderator: ctx.author.id,
            reason: "ganyu supremacy",
            user: ctx.author.id,
        });
        await ctx.editOrReply({ content: "🐐" });
    }
};
__decorate([
    inject(CaseManager),
    __metadata("design:type", CaseManager)
], WarnCommand.prototype, "caseManager", void 0);
WarnCommand = __decorate([
    Declare({
        name: "case",
        description: "A uwusome case command.",
    })
], WarnCommand);
export default WarnCommand;
