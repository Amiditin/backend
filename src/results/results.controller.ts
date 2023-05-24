import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

const resultsName = 'results';

@Controller(resultsName)
@ApiTags(resultsName)
@ApiBearerAuth()
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.resultsService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.resultsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createDto: CreateResultDto) {
    return this.resultsService.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateResultDto) {
    return this.resultsService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.resultsService.remove(id);
  }
}
