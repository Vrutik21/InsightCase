import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseAccessGuard } from 'src/shared/guards/case.guard';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { CreateCaseDto } from './dto/case.dto';

@UseGuards(JwtAuthGuard)
@Controller('case')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @Get(':id')
  @UseGuards(CaseAccessGuard)
  getCaseById(@Param('id') id: string) {
    return this.caseService.findCaseById(id);
  }

  @Post()
  createCase(@Body() dto: CreateCaseDto) {
    return this.caseService.createCase(dto);
  }
}
