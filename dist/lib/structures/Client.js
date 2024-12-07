var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Client } from "seyfert";
import { container } from "../../inversify.config.js";
import { injectable } from "inversify";
let KiritsuClient = class KiritsuClient extends Client {
    init() {
        if (this.commands) {
            this.commands.onCommand = (file) => container.resolve(file);
            this.commands.onSubCommand = (file) => container.resolve(file);
        }
        return this.start();
    }
};
KiritsuClient = __decorate([
    injectable()
], KiritsuClient);
export { KiritsuClient };
