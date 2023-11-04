import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from 'src/base/crud.service';
import { UserEntity } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hashSync } from 'bcrypt';
@Injectable()
export class UserService extends CrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    protected repository: Repository<UserEntity>,
  ) {
    super();
  }

  public async create(data: CreateUserDto): Promise<UserEntity> {
    const user = await this.repository.findOne({
      where: { email: data.email, userName: data.userName },
    });
    if (user) {
      throw new BadRequestException('User already exits.');
    }
    const entity: UserEntity = this.repository.create({
      ...data,
      password: hashSync(data.password, 10),
    });
    return entity.save();
  }
}
