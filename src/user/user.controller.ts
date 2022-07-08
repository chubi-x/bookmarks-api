import { User } from '@prisma/client';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

// guard this route for only users who are signed in with jwt token
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  // me route
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
