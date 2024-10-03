import { Module } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';

@Module({
  providers: [CaseService],
  controllers: [CaseController]
})
export class CaseModule {}
