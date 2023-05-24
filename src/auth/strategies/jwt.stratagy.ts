import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ResearchersService } from '@/researchers/researchers.service';

import type { IUser } from '../auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: ResearchersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: IUser) {
    const user = await this.userService.findById(payload.id);

    if (!user) {
      throw new UnauthorizedException('Access denied');
    }

    return { id: user.id };
  }
}
