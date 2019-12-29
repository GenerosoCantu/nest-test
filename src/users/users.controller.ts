import { Controller, Request, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto, PermissionsDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { User, Permissions } from './interfaces/user.interface';

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

  @Put('permissions/:id')
  update(@Body() permissionsDto: PermissionsDto, @Param('id') id): Promise<User> {
    return this.usersService.updatePermissions(id, permissionsDto);
  }

}
