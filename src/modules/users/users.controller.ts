import {
  Body,
  CanActivate,
  Controller,
  Delete,
  ExecutionContext,
  Get,
  Injectable,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { LoginResponse, UserPayload } from './interfaces/users-login.interface';
import { ExpreesRequestWithUser } from './interfaces/express-request-with-user.interface';
import { Public } from 'src/common/decorators/public.decorator';

@Injectable()
export class IsMineGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    return parseInt(request.params.id) === request.user.sub;
  }
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.registerUser(createUserDto);
  }

  @Public()
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
    return this.usersService.loginUser(loginUserDto);
  }

  @Get('me')
  me(@Request() req: ExpreesRequestWithUser): UserPayload {
    return req.user;
  }

  @Patch(':id')
  @UseGuards(IsMineGuard)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(IsMineGuard)
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.usersService.deleteUser(+id);
  }
}
