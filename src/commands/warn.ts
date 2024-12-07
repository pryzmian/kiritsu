import { inject } from "inversify";
import { Command, Declare, type CommandContext } from "seyfert";
import { CaseManager } from "#kiritsu/modules";
import { randomUUID } from "node:crypto";

@Declare({
    name: "case",
    description: "A uwusome case command.",
})
export default class WarnCommand extends Command {
    @inject(CaseManager) private readonly caseManager!: CaseManager;
    
    override async run(ctx: CommandContext) {
        await this.caseManager.create({
            action: "Warn",
            caseId: randomUUID(),
            id: ctx.guildId!,
            moderator: ctx.author.id,
            reason: "ganyu supremacy", // besto waifu
            user: ctx.author.id,
        })
        await this.caseManager.create({
            action: "Warn",
            caseId: randomUUID(),
            id: ctx.guildId!,
            moderator: ctx.author.id,
            reason: "ganyu supremacy", // besto waifu
            user: ctx.author.id,
        })
        await this.caseManager.create({
            action: "Warn",
            caseId: randomUUID(),
            id: ctx.guildId!,
            moderator: ctx.author.id,
            reason: "ganyu supremacy", // besto waifu
            user: ctx.author.id,
        })

        await ctx.editOrReply({ content: "🐐" })
    }
}