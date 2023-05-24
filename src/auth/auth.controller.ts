import { CreateResearcherDto } from '@/researchers/dto/create-researcher.dto';
import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { LoginResearcherDto } from '@/researchers/dto/login-researcher.dto';

const authName = 'auth';

@Controller(authName)
@ApiTags(authName)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginResearcherDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  register(@Body() dto: CreateResearcherDto) {
    return this.authService.register(dto);
  }
}
