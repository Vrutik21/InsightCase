import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';
import { prismaError } from 'src/shared/error-handling';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async createClient(dto: CreateClientDto) {
    try {
      const existingClient = await this.prisma.client.findFirst({
        where: { email: dto.email },
      });

      if (existingClient) {
        throw new ConflictException('Client with the same email already exists!');
      }

      return await this.prisma.client.create({
        data: {
          ...dto,
        },
      });
    } catch (err) {
      prismaError(err);
    }
  }

  async updateClient(dto: UpdateClientDto, id: string) {
    try {
      const existingClient = await this.prisma.client.findFirst({
        where: { email: dto.email },
      });

      if (existingClient) {
        throw new ConflictException('Client with the same email already exists!');
      }

      return this.prisma.client.update({
        where: {
          id,
        },
        data: {
          ...dto,
        },
      });
    } catch (err) {
      prismaError(err);
    }
  }

  async deleteClient(id: string) {
    try {
      return this.prisma.client.delete({
        where: { id },
      });
    } catch (err) {
      prismaError(err);
    }
  }
}
