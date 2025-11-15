import {
  Controller,
  // Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { HoursService } from './hours.service';
import { CreateHourDto } from './dto/create-hour.dto';
// import { UpdateHourDto } from './dto/update-hour.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('hours')
export class HoursController {
  constructor(private readonly hoursService: HoursService) {}

  @Post()
  create(@Body() createHourDto: CreateHourDto, @Req() req) {
    return this.hoursService.create(createHourDto, req.user);
  }

  // @Get()
  // findAll() {
  //   return this.hoursService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.hoursService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateHourDto: UpdateHourDto) {
  //   return this.hoursService.update(+id, updateHourDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.hoursService.remove(+id);
  // }
}
