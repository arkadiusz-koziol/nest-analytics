import { 
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles as UserRoles } from 'src/enum/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { SetRoles } from '../decorators/roles.decorator';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @SetRoles(UserRoles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @SetRoles(UserRoles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(+id);
  }

  @Post()
  @SetRoles(UserRoles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async create(@Body() userData: Partial<User>): Promise<User> {
    return await this.userService.create(userData);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateData: Partial<User>): Promise<User> {
    return await this.userService.update(+id, updateData);
  }

  @Delete(':id')
  @SetRoles(UserRoles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async delete(@Param('id') id: number): Promise<void> {
    return await this.userService.delete(+id);
  }
}
