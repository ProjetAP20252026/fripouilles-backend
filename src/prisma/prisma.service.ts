import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(configService: ConfigService) {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        console.log('=== DATABASE_URL FROM ConfigService ===', databaseUrl);
        
        const pool = new Pool({
            connectionString: databaseUrl
        });
        
        const adapter = new PrismaPg(pool);
        
        super({ adapter });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
