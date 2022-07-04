import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { AuthModule } from './auth/auth.module';
import { PrismaDbModule } from './prisma_db/prisma_db.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({}),
    UserModule, 
    BookmarkModule,
    AuthModule, 
    PrismaDbModule],
})
export class AppModule {}
