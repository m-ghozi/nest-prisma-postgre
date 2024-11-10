import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto): string {
    console.log(createUserDto);
    return 'Post User;';
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto): string {
    console.log(loginUserDto);
    return 'Login User!';
  }

  @Get('me')
  me(): string {
    return 'Get Profile!';
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): string {
    console.log(updateUserDto);
    return `Update User ${id}`;
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: string): string {
    return `Delete User ${id}`;
  }
}
