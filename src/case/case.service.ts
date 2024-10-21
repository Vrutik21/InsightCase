import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Access_level, Status } from '@prisma/client';
import { CreateCaseDto } from './dto/case.dto';
import { prismaError } from 'src/shared/error-handling';

@Injectable()
export class CaseService {
  constructor(private readonly prisma: PrismaService) {}

  // Find a case by ID
  async findCaseById(id: string) {
    return this.prisma.case.findUnique({
      where: { id },
      include: { client: true, tasks: true },
    });
  }

  // Assign a user access to a case
  async assignCaseAccess(user_id: string, case_id: string, access_level: Access_level) {
    return this.prisma.case_access.create({
      data: {
        user_id,
        case_id,
        access_level,
      },
    });
  }

  async getAllCases() {
    try {
      return await this.prisma.case.findMany();
    } catch (err) {
      prismaError(err);
    }
  }

  async getCasesForUser(user_id: string) {
    return this.prisma.case_access.findMany({
      where: { user_id },
      include: { case: true },
    });
  }

  async createCase(dto: CreateCaseDto) {
    try {
      const { client_id, case_manager_id, service_id, start_at, region, status, staff_id } = dto;
      const start_date = new Date(start_at);

      const service = await this.prisma.service.findUnique({
        where: { id: dto.service_id },
      });

      if (!service) {
        new NotFoundException('Service does not exist!');
      }

      const newCase = await this.prisma.case.create({
        data: {
          client_id,
          case_manager_id,
          staff_id,
          service_id,
          start_at: start_date.toISOString(),
          region,
          status: status || Status.OPEN,
        },
      });

      if (service) {
        const tasks = [];

        if (service.initial_contact_days) {
          tasks.push({
            case_id: newCase.id,
            description: 'Initial contact',
            due_date: new Date(
              start_date.getTime() + service.initial_contact_days * 24 * 60 * 60 * 1000,
            ),
            staff_id,
          });
        }

        if (service.intake_interview_days) {
          tasks.push({
            case_id: newCase.id,
            description: 'Intake Interview',
            due_date: new Date(
              start_date.getTime() + service.intake_interview_days * 24 * 60 * 60 * 1000,
            ),
            staff_id,
          });
        }

        // Employment Action Plan (EAP) task (e.g., within 2 weeks)
        if (service.action_plan_weeks) {
          tasks.push({
            case_id: newCase.id,
            description: 'Employment Action Plan (EAP)',
            due_date: new Date(
              start_date.getTime() + service.action_plan_weeks * 7 * 24 * 60 * 60 * 1000,
            ),
            staff_id,
          });
        }

        await this.prisma.task.createMany({ data: tasks });
      }

      return newCase;
    } catch (err) {
      prismaError(err);
    }
  }
}
