import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();

    // Attach the user to the req is session userId exists
    const { userId } = request.session;
    if (userId) {
      const user = await this.userService.findOneByUserId(userId);
      if (user) {
        request.user = user;
        return true; // Valid 🎉
      }
    }

    if (isPublic) {
      return true;
    }

    throw new UnauthorizedException();
  }
}
