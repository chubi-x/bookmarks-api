import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

// user module
@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
