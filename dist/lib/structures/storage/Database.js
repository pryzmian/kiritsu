var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PrismaClient } from "@prisma/client";
import { KiritsuClient } from "#kiritsu/structures";
import { inject, injectable } from "inversify";
let Database = class Database extends PrismaClient {
    client;
    connect() {
        return this.$connect().then(() => {
            this.client.logger.info("Connected to the database.");
        });
    }
    disconnect() {
        return this.$disconnect().then(() => {
            this.client.logger.info("Disconnected from the database.");
        });
    }
};
__decorate([
    inject(KiritsuClient),
    __metadata("design:type", KiritsuClient)
], Database.prototype, "client", void 0);
Database = __decorate([
    injectable()
], Database);
export { Database };
