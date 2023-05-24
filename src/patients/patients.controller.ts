import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserId } from '@/decorators/user-id.decorator';

const patientsName = 'patients';

@Controller(patientsName)
@ApiTags(patientsName)
@ApiBearerAuth()
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@UserId() id: string) {
    return this.patientsService.findAll(id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getById(@Param('id') id: string) {
    return this.patientsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createDto: CreatePatientDto) {
    return this.patientsService.create(createDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateDto: UpdatePatientDto) {
    return this.patientsService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}
