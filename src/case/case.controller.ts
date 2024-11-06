import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseAccessGuard } from 'src/shared/guards/case.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { CreateCaseDto } from './dto/case.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Case')
// @UseGuards(JwtAuthGuard)
@Controller('case')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @Get(':id')
  @UseGuards(CaseAccessGuard)
  getCaseById(@Param('id') id: string) {
    return this.caseService.findCaseById(id);
  }

  @Get()
  getallCases() {
    return this.caseService.getAllCases();
  }

  @Post()
  createCase(@Body() dto: CreateCaseDto) {
    return this.caseService.createCase(dto);
  }
}
