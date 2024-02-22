import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { HttpExceptionFilter } from 'src/common/filters/HttpExceptionFilter';
import { UserNotFoundException } from 'src/common/exceptions/userNotFoundException';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Auth()
  @UseFilters(HttpExceptionFilter)
  findOne(@Param('id') id: number) {
    const user = this.usersService.findOne(id);
    if (user) {
      return user;
    } else {
      throw new UserNotFoundException();
    }
  }



}
