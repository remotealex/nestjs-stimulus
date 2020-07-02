import {
  Controller,
  Get,
  Post,
  Render,
  Session,
  Res,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { User } from './user.decorator';
import { AuthGuard } from './auth.guard';
import { Public } from './public.decorator';

@Controller()
@UseGuards(AuthGuard)
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Get('login')
  @Public()
  loginView(@Res() res: Response, @User() user) {
    if (user) {
      return res.redirect('/profile');
    }

    return res.render('login', { title: 'Login' });
  }

  @Get('logout')
  @Post('logout')
  @Public()
  logout(@Res() res: Response, @Session() session: any) {
    session.destroy();
    return res.redirect('/login');
  }

  @Post('login')
  @Public()
  async login(
    @Res() res: Response,
    @Body() body: { username: string },
    @Session() session: any,
  ) {
    const user = await this.usersService.findOneByUsername(body.username);

    if (!user) {
      return res.render('login', {
        title: 'Login',
        error: 'Not a valid username',
      });
    }

    session.userId = user.userId;
    return res.redirect('/profile');
  }
}
