import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hour } from '../entities/hour.entity';
import { CreateHourDto } from '../dto/create-hour.dto';

@Injectable()
export class HoursRepository {
  constructor(
    @InjectRepository(Hour)
    private readonly hoursRepository: Repository<Hour>,
  ) {}

  async create(data: CreateHourDto): Promise<Hour> {
    try {
      const hour = this.hoursRepository.create(data);
      return this.hoursRepository.save(hour);
    } catch (error) {
      throw error;
    }
  }

  // async findAll(page = 1, limit = 10) {
  //   try {
  //     const [data, total] = await this.repositoryUser.findAndCount({
  //       skip: (page - 1) * limit,
  //       take: limit,
  //       order: { created_at: 'DESC' },
  //     });
  //     return { data, total, page, limit };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async findOne(id: number) {
  //   try {
  //     return this.repositoryUser.findOne({ where: { id } });
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async findByEmail(email: string) {
  //   try {
  //     return this.repositoryUser.findOne({ where: { email } });
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async update(id: number, data: Partial<CreateUserDto>) {
  //   try {
  //     const user = await this.findOne(id);
  //     if (!user) return null;

  //     const updatedUser = this.repositoryUser.merge(user, data);
  //     return this.repositoryUser.save(updatedUser);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async delete(id: number) {
  //   try {
  //     const user = await this.findOne(id);
  //     if (!user) return null;
  //     await this.repositoryUser.delete(id);
  //     return { success: true };
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
