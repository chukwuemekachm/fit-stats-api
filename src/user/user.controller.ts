import axios from 'axios';
import { Controller, Get, Post, Body, Param, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dtos/create.dto';
import { FindOneUserParams } from './dtos/find.dto';
import { UpdateUserDto } from './dtos/update.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { signJWT } from './utils';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async get(@Param() findOneUser: FindOneUserParams) {
    const user = await this.userService.getUserById(findOneUser.id);
    return new UserDto(user);
  }

  @Get()
  async getUsers() {
    const users = await this.userService.getUsers();
    return users.map((user) => new UserDto(user));
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    try {
      if (createUserDto.googleId) {
        await axios.get(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${createUserDto.idToken}`,
        );
      }

      let user = await this.userService.getUser({
        googleId: createUserDto.googleId,
        facebookId: createUserDto.facebookId,
        outlookId: createUserDto.outlookId,
      });

      if (!user) {
        user = await this.userService.createUser(createUserDto);
      }

      const userDTO = new UserDto(user);

      return {
        token: signJWT({ id: userDTO.id }),
        user: userDTO,
      };
    } catch (error) {
      return {
        statusCode: 401,
        message: `Cannot ${req.method} ${req.url}`,
        error: 'Invalid token',
      };
    }
  }

  @Put(':id')
  async update(
    @Param() findOneUser: FindOneUserParams,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.updateUser(
      findOneUser.id,
      updateUserDto,
    );
    return new UserDto(user);
  }
}
