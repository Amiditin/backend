import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

import { ResearchersService } from '@/researchers/researchers.service';
import { CreateResearcherDto } from '@/researchers/dto/create-researcher.dto';

import type { IUser } from './auth.types';

@Injectable()
export class AuthService {
  constructor(private researchersService: ResearchersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.researchersService.findByEmail(email);

    if (!user || !argon2.verify(user.password, password)) {
      throw new BadRequestException('Email or password are incorrect');
    }

    const { password: userPassword, ...result } = user;

    return result;
  }

  async register(dto: CreateResearcherDto): Promise<any> {
    const existUser = await this.researchersService.findByEmail(dto.email);

    if (existUser) {
      throw new BadRequestException('User with this email is already exists');
    }

    const user = await this.researchersService.create({
      ...dto,
      password: await argon2.hash(dto.password),
    });

    return { token: this.jwtService.sign({ id: user.id }) };
  }

  async login(user: IUser) {
    return { token: this.jwtService.sign({ id: user.id }) };
  }
}
