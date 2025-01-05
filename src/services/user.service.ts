import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    Logger.log(this.userRepository.find());
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(userData: Partial<User>): Promise<User> {
    const hashedPassword = await this.hashPassword(userData.password);
    const newUser = this.userRepository.create({ ...userData, password: hashedPassword });
    return this.userRepository.save(newUser);
  }

  async update(id: number, updateData: Partial<User>): Promise<User> {
    const user = await this.findOne(id);

    if (updateData.password) {
      updateData.password = await this.hashPassword(updateData.password);
    }

    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async findByEmail(email: string): Promise<User | null> {
  return this.userRepository.findOne({ where: { email } });
}
}

