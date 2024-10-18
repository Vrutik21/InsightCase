import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';

@UseGuards(JwtAuthGuard)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  getAllClients() {
    return this.clientService.getAllClients();
  }

  @Get(':id')
  getClient(@Param('id') id: string) {
    return this.clientService.getClient(id);
  }

  @Post()
  createClient(@Body() dto: CreateClientDto) {
    return this.clientService.createClient(dto);
  }

  @Patch(':id')
  updateClient(@Param('id') id: string, @Body() dto: UpdateClientDto) {
    return this.clientService.updateClient(id, dto);
  }

  @Delete(':id')
  deleteClient(@Param('id') id: string) {
    return this.clientService.deleteClient(id);
  }
}
