import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

@UseGuards(JwtAuthGuard)
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  getAllService() {
    return this.serviceService.getAllServices();
  }

  @Get(':id')
  getService(@Param('id') id: string) {
    return this.serviceService.getService(id);
  }

  @Post()
  createService(@Body() dto: CreateServiceDto) {
    return this.serviceService.createService(dto);
  }

  @Patch(':id')
  updateService(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.serviceService.updateService(id, dto);
  }

  @Delete(':id')
  deleteService(@Param('id') id: string) {
    return this.serviceService.deleteService(id);
  }
}
