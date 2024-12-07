var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Redis } from "ioredis";
import { injectable } from "inversify";
const buildKey = (key) => `kirito:${key}`;
let RedisClient = class RedisClient {
    redis = new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    });
    set(key, object) {
        return this.redis.set(buildKey(key), JSON.stringify(object));
    }
    async get(key) {
        const json = await this.redis.get(buildKey(key));
        return json ? JSON.parse(json) : null;
    }
    delete(key) {
        return this.redis.del(buildKey(key));
    }
    async addSet(groupKey, itemKey, object) {
        const key = buildKey(groupKey);
        await this.redis.sadd(key, itemKey);
        return this.set(itemKey, object);
    }
    async getSet(groupKey) {
        const groupKeyBuilt = buildKey(groupKey);
        const itemKeys = await this.redis.smembers(groupKeyBuilt);
        const items = [];
        for (const itemKey of itemKeys) {
            const item = await this.get(itemKey);
            if (item)
                items.push(item);
        }
        return items;
    }
    async deleteSet(groupKey) {
        const groupKeyBuilt = buildKey(groupKey);
        const itemKeys = await this.redis.smembers(groupKeyBuilt);
        for (const itemKey of itemKeys) {
            await this.delete(itemKey);
        }
        return this.redis.del(groupKeyBuilt);
    }
};
RedisClient = __decorate([
    injectable()
], RedisClient);
export { RedisClient };
