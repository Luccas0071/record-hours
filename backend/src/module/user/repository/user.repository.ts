import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repositoryUser: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    try {
      const user = this.repositoryUser.create(data);
      return this.repositoryUser.save(user);
    } catch (error) {
      throw error;
    }
  }

  async findAll(page = 1, limit = 10) {
    try {
      const [data, total] = await this.repositoryUser.findAndCount({
        select: ['id', 'name', 'email', 'role', 'created_at'],
        skip: (page - 1) * limit,
        take: limit,
        order: { created_at: 'DESC' },
      });
      return { data, total, page, limit };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return this.repositoryUser.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      return this.repositoryUser.findOne({ where: { email } });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: Partial<CreateUserDto>) {
    try {
      const user = await this.findOne(id);
      if (!user) return null;

      const updatedUser = this.repositoryUser.merge(user, data);
      return this.repositoryUser.save(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const user = await this.findOne(id);
      if (!user) return null;
      await this.repositoryUser.delete(id);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
}
