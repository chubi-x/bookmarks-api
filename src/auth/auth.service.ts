import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaDbService } from 'src/prisma_db/prisma_db.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaDbService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  /**
   * SIGN IN LOGIC
   * */
  async signin(dto: AuthDto) {
    //find the user using their email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //if user does not exist throw exception (called a guard exception)
    if (!user) throw new ForbiddenException('User does not exist');
    // compare user password hash to password provided by user
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if the passwords dont match throw an exception
    if (!pwMatches) throw new ForbiddenException('password does not match');

    //if user exists and password is correct send back the user
    delete user.hash;
    return this.signToken(user.id, user.email);
  }

  /**
   * SIGN UP LOGIC
   * */
  async signup(dto: AuthDto) {
    //generate password hash
    const hash = await argon.hash(dto.password);
    //save new user in db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      //return saved user
      return this.signToken(user.id, user.email);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Credentials are taken');
        }
      }
      throw err;
    }
  }

  /**
   * FUNCTION TO SIGN JWT TOKENS
   */
  signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
  }
}
