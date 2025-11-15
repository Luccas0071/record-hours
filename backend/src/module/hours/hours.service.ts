import { Injectable } from '@nestjs/common';
import { CreateHourDto } from './dto/create-hour.dto';
import { HoursRepository } from './repository/hours.repository';
import { User } from '../user/entities/user.entity';
// import { UpdateHourDto } from './dto/update-hour.dto';

@Injectable()
export class HoursService {
  constructor(private readonly hoursRepository: HoursRepository) {}

  async create(createHour: CreateHourDto, user: User) {
    try {
      createHour.user = user;
      const hour = await this.hoursRepository.create(createHour);
      return { success: true, data: hour };
    } catch (error) {
      return {
        success: false,
        error: {
          message: `Error created hour: ${error.message}`,
          action: 'create',
        },
      };
    }
  }

  // findAll() {
  //   return `This action returns all hours`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} hour`;
  // }

  // update(id: number, updateHourDto: UpdateHourDto) {
  //   return `This action updates a #${id} hour`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} hour`;
  // }
}
