import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaError } from 'src/shared/error-handling';
import { CreateTaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTasks() {
    try {
      return await this.prisma.task.findMany();
    } catch (err) {
      prismaError(err);
    }
  }

  async getTask(id: string) {
    try {
      return await this.prisma.task.findFirst({
        where: {
          id,
        },
      });
    } catch (err) {
      prismaError(err);
    }
  }

  async getTasksByUser(id: string) {
    try {
      return await this.prisma.task.findMany({
        where: {
          staff_id: id,
        },
      });
    } catch (err) {
      prismaError(err);
    }
  }

  async createTask(dto: CreateTaskDto) {
    try {
      const { due_date: _due_date, ...otherData } = dto;
      const due_date = new Date(dto.due_date).toISOString();

      return await this.prisma.task.create({
        data: { ...otherData, due_date },
      });
    } catch (err) {
      prismaError(err);
    }
  }

  async deleteTask(id: string) {
    try {
      return await this.prisma.task.delete({ where: { id } });
    } catch (err) {
      prismaError(err);
    }
  }
}
