import { ApiProperty } from '@nestjs/swagger';
import { Region, Status } from '@prisma/client';
import { IsDateString, IsEnum, IsString } from 'class-validator';

export class CreateCaseDto {
  @ApiProperty({
    example: 'asda343dasd32',
    required: true,
  })
  @IsString()
  client_id: string;

  @ApiProperty({
    example: 'asdasg8492najsd',
    required: true,
  })
  @IsString()
  case_manager_id: string;

  @ApiProperty({
    example: 'sjdknfnv3224df',
    required: true,
  })
  @IsString()
  service_id: string;

  @ApiProperty({
    example: 'WINDSOR',
    required: true,
  })
  @IsEnum({ Region })
  region: Region;

  @ApiProperty({
    example: 'OPEN',
    required: false,
  })
  @IsEnum({ Status })
  status?: Status;

  @ApiProperty({
    example: '21-10-2024',
    required: false,
  })
  @IsDateString()
  start_at?: Date;
}

export class UpdateCaseDto {
  @ApiProperty({
    example: 'OPEN',
    required: false,
  })
  @IsEnum({ Status })
  status?: Status;

  @ApiProperty({
    example: '21-10-2024',
    required: false,
  })
  @IsDateString()
  closed_at?: Date;
}
