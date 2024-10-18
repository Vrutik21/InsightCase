import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseAccessGuard } from 'src/shared/guards/case.guard';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';

@Controller('case')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard, CaseAccessGuard)
  getCaseById(@Param('id') id: string) {
    return this.caseService.findCaseById(id);
  }
}
