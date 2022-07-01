import { Module } from '@nestjs/common';
import { PrismaDbService } from './prisma_db.service';

@Module({
  providers: [PrismaDbService],
  exports: [PrismaDbService]
})
export class PrismaDbModule {}
