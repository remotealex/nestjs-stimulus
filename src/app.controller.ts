import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { User } from './auth/user.decorator';
import { Public } from './auth/public.decorator';

@Controller()
@UseGuards(AuthGuard)
export class AppController {
  @Get()
  @Render('index')
  @Public()
  homeView(@User() user) {
    return { title: 'Home page', user, userString: JSON.stringify(user) };
  }

  @Get('profile')
  @Render('profile')
  profileView(@User() user) {
    return { title: 'Your profile', user, userString: JSON.stringify(user) };
  }
}
