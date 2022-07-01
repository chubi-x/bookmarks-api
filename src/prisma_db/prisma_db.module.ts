import { Module } from '@nestjs/common';
import { PrismaDbService } from './prisma_db.service';

@Module({
  providers: [PrismaDbService]
})
export class PrismaDbModule {}
