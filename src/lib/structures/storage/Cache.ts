import { Redis } from "ioredis";
import { injectable } from "inversify";

const buildKey = (key: string) => `kirito:${key}`;

@injectable()
export class RedisClient {
    readonly redis = new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    });

    public set<T>(key: string, object: T) {
        return this.redis.set(buildKey(key), JSON.stringify(object));
    }

    public async get<T>(key: string): Promise<T | null> {
        const json = await this.redis.get(buildKey(key));
        return json ? JSON.parse(json) as T : null;
    }

    public delete(key: string) {
        return this.redis.del(buildKey(key));
    }

    // by chatgpt :3
    public async addSet<T>(groupKey: string, itemKey: string, object: T) {
        const key = buildKey(groupKey);
        await this.redis.sadd(key, itemKey);
        return this.set(itemKey, object);
    }

    public async getSet<T>(groupKey: string): Promise<T[]> {
        const groupKeyBuilt = buildKey(groupKey);
        const itemKeys = await this.redis.smembers(groupKeyBuilt);
        const items: T[] = [];

        for (const itemKey of itemKeys) {
            const item = await this.get<T>(itemKey);
            if (item) items.push(item);
        }

        return items;
    }

    public async deleteSet(groupKey: string) {
        const groupKeyBuilt = buildKey(groupKey);
        const itemKeys = await this.redis.smembers(groupKeyBuilt);
        
        for (const itemKey of itemKeys) {
            await this.delete(itemKey);
        }

        return this.redis.del(groupKeyBuilt);
    }
}