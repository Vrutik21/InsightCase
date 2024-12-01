import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: '23jad2424bhabd232',
    required: true,
    description: 'Case ID for which task is created',
  })
  @IsString()
  case_id: string;

  @ApiProperty({
    example: '23jad2424bhabd232',
    required: true,
    description: 'User ID for which task is created',
  })
  @IsString()
  staff_id: string;

  @ApiProperty({
    example: 'Employment Action Plan (EAP)',
    required: true,
    description: 'Description of the task',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: '2024-10-21',
    required: true,
    description: 'Due date for the task assigned',
  })
  @IsDateString()
  due_date: Date;
}

export class UpdateTaskDto {
  @ApiProperty({ required: true, description: 'completion status' })
  @IsBoolean()
  is_complete: boolean;
}
