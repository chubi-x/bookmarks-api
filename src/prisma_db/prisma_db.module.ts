import { Global, Module } from '@nestjs/common';
import { PrismaDbService } from './prisma_db.service';

// create global prisma module so each module will have access to db objects
@Global()
@Module({
  providers: [PrismaDbService],
  exports: [PrismaDbService],
})
export class PrismaDbModule {}
