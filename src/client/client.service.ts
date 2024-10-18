import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';
import { prismaError } from 'src/shared/error-handling';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async getClient(id: string) {
    try {
      return await this.prisma.client.findFirst({
        where: {
          id,
        },
      });
    } catch (err) {
      prismaError(err);
    }
  }

  async getAllClients() {
    try {
      return await this.prisma.client.findMany();
    } catch (err) {
      prismaError(err);
    }
  }

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

  async updateClient(id: string, dto: UpdateClientDto) {
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
      const clientCases = await this.prisma.case.findMany({
        where: {
          client_id: id,
        },
      });

      if (clientCases.some((item) => item.status !== 'CLOSED')) {
        throw new ForbiddenException("One or more of the clien't case(s) are still in progress");
      }

      return await this.prisma.client.delete({
        where: { id },
      });
    } catch (err) {
      prismaError(err);
    }
  }
}
