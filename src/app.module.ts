import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { AuthModule } from './auth/auth.module';
import { PrismaDbModule } from './prisma_db/prisma_db.module';
import { ConfigModule } from '@nestjs/config';

//instantiate global app module
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    BookmarkModule,
    AuthModule,
    PrismaDbModule,
  ],
})
export class AppModule {}
