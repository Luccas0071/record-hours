import { Module } from '@nestjs/common';
import { HoursService } from './hours.service';
import { HoursController } from './hours.controller';
import { HoursRepository } from './repository/hours.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hour } from './entities/hour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hour])],
  controllers: [HoursController],
  providers: [HoursService, HoursRepository],
})
export class HoursModule {}
