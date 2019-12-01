import { Controller, Request, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.create(userDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<User> {
    return this.usersService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
