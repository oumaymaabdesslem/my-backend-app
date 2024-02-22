import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }


  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }


  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }



  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id: id } });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }


  findByEmailWithPassword(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'profiles'],
    });
  }


}