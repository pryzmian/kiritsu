import { config } from "seyfert";
import { GatewayIntentBits } from "seyfert/lib/types/index.js";

const isWindows = process.platform === "win32";
const isDebug = process.argv.includes("--debug");

const output = isWindows && isDebug ? "src" : "dist";

export default config.bot({
    debug: isDebug,
    token: process.env.DISCORD_TOKEN,
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
    locations: {
        output,
        base: "src",
        commands: "commands",
        events: "events",
    },
});