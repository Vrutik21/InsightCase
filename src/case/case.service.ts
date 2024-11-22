import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Access_level, Status } from '@prisma/client';
import { CreateCaseDto } from './dto/case.dto';
import { prismaError } from 'src/shared/filters/error-handling';
import { GraphService } from 'src/graph/graph.service';
import * as appConfig from 'appConfig.json';
import { Request } from 'express';
import axios from 'axios';

@Injectable()
export class CaseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly graphService: GraphService,
  ) {}

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
      return await this.prisma.case.findMany({
        include: {
          case_manager: true,
          staff: true,
          client: true,
          service: true,
          _count: {
            select: {
              tasks: true,
            },
          },
        },
      });
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

  async createCase(dto: CreateCaseDto, req: Request) {
    try {
      const { client_id, case_manager_id, service_id, start_at, region, status, staff_id } = dto;
      const start_date = new Date(start_at);

      console.log(start_date.toISOString());
      const service = await this.prisma.service.findUnique({
        where: { id: dto.service_id },
      });

      const client = await this.prisma.client.findFirst({ where: { id: client_id } });

      if (!client) {
        new NotFoundException('Client not found');
      }

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

      console.log('first');

      if (!service) {
        throw new NotFoundException('Service does not exist!');
      }

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

      // Integrate tasks with Microsoft To Do
      const access_token = await this.graphService.getAccessToken(req);

      console.log(access_token, 'access');

      // Create a To Do list for the staff if not existing
      const toDoListId = await this.graphService.createToDoList(
        access_token,
        `Tasks for Case ${newCase.id}`,
      );

      // Add each task to the To Do list
      for (const task of tasks) {
        await this.graphService.addTaskToToDoList(
          access_token,
          toDoListId,
          task.description,
          task.due_date.toISOString(),
        );

        // Add task to Microsoft Calendar
        await this.graphService.addEventToCalendar(access_token, {
          subject: task.description,
          start: {
            dateTime: task.due_date.toISOString(),
            timeZone: 'UTC',
          },
          end: {
            dateTime: new Date(task.due_date.getTime() + 3600000).toISOString(), // 1-hour event
            timeZone: 'UTC',
          },
          attendees: [
            {
              emailAddress: {
                address: client.email,
                name: client.first_name + client.last_name,
              },
              type: 'required',
            },
          ],
        });
      }

      return newCase;
    } catch (err) {
      prismaError(err);
    }
  }

  async testTasks(req: Request) {
    try {
      const accessToken = await this.graphService.getAccessToken(req);
      const start_date = new Date('2024-11-7');
      const due_date = new Date(start_date.getTime() + 3 * 24 * 60 * 60 * 1000);

      if (!accessToken) {
        throw new UnauthorizedException('User not logged in');
      }

      return await this.createToDoTaskList('Intake interview', due_date, accessToken);
      // return await axios.get('https://graph.microsoft.com/v1.0/me/todo/lists', {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // });
    } catch (err) {
      prismaError(err);
    }
  }

  // Helper function to create a Microsoft To Do task
  private async createToDoTaskList(title: string, dueDate: Date, accessToken: string) {
    try {
      // const staff_id = 'dad674a7-4491-48ca-b4ae-68f13c384988';
      const userEndpoint = `https://graph.microsoft.com/v1.0/me/todo/lists`;
      await axios.post(
        userEndpoint,
        {
          displayName: 'List created from app',
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.error('Error creating Microsoft To Do task:', err);
    }
  }

  async fetchAndFormatCalendarEvents(req: Request): Promise<any[]> {
    const access_token = await this.graphService.getAccessToken(req);
    const endpoint = 'https://graph.microsoft.com/v1.0/me/events';

    try {
      // Fetch events from the Microsoft Graph API
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      });

      const events = response.data.value;

      // Format events for the frontend
      return events.map((event) => ({
        id: event.id,
        title: event.subject,
        startDate: event.start?.dateTime || null,
        endDate: event.end?.dateTime || null,
        location: event.location?.displayName || 'No location',
        organizer: event.organizer?.emailAddress?.name || 'Unknown organizer',
      }));
    } catch (err) {
      throw new Error(`Failed to fetch calendar events: ${err.message}`);
    }
  }

  // async createToDoTask(
  //   // task_id: string,
  //   // title: string,
  //   // start_date: Date,
  //   // due_date: Date,
  //   req: Request,
  // ) {
  //   try {
  //     const access_token = await this.graphService.getAccessToken(req);
  //     const list_id =
  //       'AQMkADAwATMwMAExLTg3MzktOWJlOC0wMAItMDAKAC4AAANZo7BSXqcOTIHYAq0AyHgNAQCh4SnJem9eS48ve9VH83knAAACamYAAAA=';
  //     const endpoint = `${appConfig.GRAPH_API_ROOT_URL}/me/todo/lists/${list_id}/tasks`;

  //     const start_date = new Date('2024-11-15');
  //     const due_date = new Date(start_date.getTime() + 3 * 24 * 60 * 60 * 1000);

  //     if (!access_token) {
  //       throw new UnauthorizedException('User not logged in');
  //     }

  //     await axios.post(
  //       endpoint,
  //       {
  //         title: 'Intake interview',
  //         // dueDateTime: due_date,
  //         // status: 'notStarted',
  //         // startDateTime: start_date,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );

  //     const data = await axios.get(
  //       `${appConfig.GRAPH_API_ROOT_URL}/me/todo/lists/${list_id}/tasks`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );

  //     return data.data;
  //   } catch (err) {
  //     prismaError(err);
  //   }
  // }
}
