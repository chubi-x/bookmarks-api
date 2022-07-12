import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaDbService } from '../prisma_db/prisma_db.service';
import { EditUserDto, EditUserPasswordDto } from './dto';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaDbService) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    delete user.hash;
    return user;
  }
  async editPassword(userId: number, dto: EditUserPasswordDto) {
    const newPassword = await argon.hash(dto.password);
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hash: newPassword,
      },
    });
    delete user.hash;
    return user;
  }
}
