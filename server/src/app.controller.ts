import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Google OAuth 2.0')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}
  public jwtToken = { access_token: '' };
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Req() req) {
    return this.authService.signIn(req.user);
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async google() {}

  @UseGuards(AuthGuard('google'))
  @Get('auth/google/callback')
  async googleCallback(@Req() req, @Res() res: Response) {
    const jwt = await this.authService.signIn(req.user);
    this.jwtToken = { access_token: jwt.token };
    res.set('authorization', jwt.token);
    res.status(200);
    return res.json({
      ...jwt,
    });
  }

  @UseGuards(AuthGuard('google'))
  @Get('home')
  async getHome(@Req() req, @Res() res: Response) {
    if (this.jwtToken.access_token) {
      res.json({ data: {} });
    } else {
      res.json({});
    }
  }

  // need more research
  @Get('logout')
  async logout(@Req() req, @Res() res) {
    return 'successfully logout';
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async Google(@Req() req) {}

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req, @Res() res) {
    res.json(req.user);
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
