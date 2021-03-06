import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaDbService } from '../prisma_db/prisma_db.service';
import { SignupDto, LoginDto } from './dto';
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
  async signin(dto: LoginDto) {
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
  async signup(dto: SignupDto) {
    //generate password hash
    const hash = await argon.hash(dto.password);
    //save new user in db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
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
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    // payload object that holds user information
    const payload = {
      sub: userId,
      email,
    };
    // jwt secret phrase
    const secret = this.config.get('JWT_SECRET');
    //create and sign jwt token
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
    // return access token object
    return {
      access_token: token,
    };
  }
}
