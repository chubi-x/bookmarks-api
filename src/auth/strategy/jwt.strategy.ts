import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaDbService } from '../../prisma_db/prisma_db.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // extract jwt token from auth header and jwt secret from environment using config service
  constructor(config: ConfigService, private prisma: PrismaDbService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  // method to validate users with their token
  async validate(payload: { sub: number; email: string }) {
    // find user with their id
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    // do not return password hash
    delete user.hash;
    return user;
  }
}
