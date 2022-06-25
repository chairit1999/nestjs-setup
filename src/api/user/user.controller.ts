import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { classToPlain } from 'class-transformer';
import { ENUMUserGroup } from 'src/share/enum/user-group.enum';
import { JwtPayload } from 'src/share/interface/jwt.interface';
import { CurrentUser, IsPublic } from 'src/auth/decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create({
      ...createUserDto,
    });
    return classToPlain(user, {
      groups: [ENUMUserGroup.CREATEUSERGROUP],
      strategy: 'excludeAll',
    });
  }

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@CurrentUser() user: JwtPayload) {
    console.log(user);

    return await this.userService.findAll();
  }
}
