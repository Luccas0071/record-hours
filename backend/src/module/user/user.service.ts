import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: CreateUserDto) {
    try {
      const existing = await this.userRepository.findByEmail(data.email);

      if (existing) {
        throw new Error(`E-mail ${data.email} já está cadastrado.`);
      }
      data.password = await bcrypt.hash(data.password, 10);

      return await this.userRepository.create(data);
    } catch (error: any) {
      const custom_error = {
        message: `Error creating user: ${error.message}`,
        action: 'create',
      };
      return {
        success: false,
        error: custom_error,
      };
    }
  }

  async findAll(page: number, limit: number) {
    try {
      return this.userRepository.findAll(page, limit);
    } catch (error) {
      const custom_error = {
        message: `Error finding users: ${error.message}`,
        action: 'findAll',
      };
      return {
        success: false,
        error: custom_error,
      };
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      const custom_error = {
        message: `Error finding user with id ${id}: ${error.message}`,
        action: 'findOne',
      };
      return {
        success: false,
        error: custom_error,
      };
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: Partial<CreateUserDto>) {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      Object.assign(user, data);
      return this.userRepository.update(id, user);
    } catch (error) {
      const custom_error = {
        message: `Error updating user with id ${id}: ${error.message}`,
        action: 'update',
      };
      return {
        success: false,
        error: custom_error,
      };
    }
  }

  async remove(id: number) {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      const custom_error = {
        message: `Error removing user with id ${id}: ${error.message}`,
        action: 'remove',
      };
      return {
        success: false,
        error: custom_error,
      };
    }
  }

  async setCurrentRefreshToken(id: number, refreshToken: string) {
    try {
      await this.userRepository.update(id, {
        currentHashedRefreshToken: refreshToken,
      });
    } catch (error) {
      const custom_error = {
        message: `Error update refresh token user with id ${id}: ${error.message}`,
        action: 'setCurrentRefreshToken',
      };
      return {
        success: false,
        error: custom_error,
      };
    }
  }
}
