import { Client } from "seyfert";
import { container } from "../../inversify.config.js";
import { injectable } from "inversify";

@injectable()
export class KiritsuClient extends Client {

    public init(): Promise<void> {
        if (this.commands) {
            this.commands.onCommand = (file) => container.resolve(file);
            this.commands.onSubCommand = (file) => container.resolve(file);
        }

        return this.start();
    }
}
