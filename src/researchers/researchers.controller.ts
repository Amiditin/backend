import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ResearchersService } from './researchers.service';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { UserId } from '@/decorators/user-id.decorator';
import { UpdateResearcherDto } from './dto/update-researcher.dto';

const researchersName = 'researchers';

@Controller(researchersName)
@ApiTags(researchersName)
@ApiBearerAuth()
export class ResearchersController {
  constructor(private readonly researchersService: ResearchersService) {}

  @Get()
  async findAll() {
    const researchers = await this.researchersService.findAll();

    return researchers.map((researcher) => {
      const { password, ...result } = researcher;

      return result;
    });
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getMe(@UserId() id: string) {
    const { password, ...researcher } = await this.researchersService.findById(id);

    return researcher;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateResearcherDto) {
    return this.researchersService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.researchersService.remove(id);
  }
}
