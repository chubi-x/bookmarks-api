import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

// user module
@Module({
  controllers: [UserController],
})
export class UserModule {}
