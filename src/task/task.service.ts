import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaError } from 'src/shared/filters/error-handling';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { GraphService } from 'src/graph/graph.service';
import { Request } from 'express';

@Injectable()
export class TaskService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly graphService: GraphService,
  ) {}

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

  async updateTaskCompletionStatus(taskId: string, dto: UpdateTaskDto, req: Request) {
    // Find the task
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // Update task completion status in the local database
    const updatedTask = await this.prisma.task.update({
      where: { id: taskId },
      data: {
        is_complete: dto.is_complete,
      },
    });

    // Sync with Microsoft Graph
    if (task.microsoft_todo_id) {
      await this.updateMicrosoftToDoTask(
        task.microsoft_list_id,
        task.microsoft_todo_id,
        dto.is_complete,
        req,
      );
    }

    if (task.microsoft_calendar_event_id) {
      await this.updateMicrosoftCalendarEvent(
        task.microsoft_calendar_event_id,
        dto.is_complete,
        req,
      );
    }

    return updatedTask;
  }

  private async updateMicrosoftToDoTask(
    toDoListId: string,
    todoTaskId: string,
    isComplete: boolean,
    req: Request,
  ) {
    const endpoint = `https://graph.microsoft.com/v1.0/me/todo/lists/${toDoListId}/tasks/${todoTaskId}`;
    const access_token = await this.graphService.getAccessToken(req);
    await this.graphService.patchMicrosoftResource(
      endpoint,
      { status: isComplete ? 'completed' : 'notStarted' },
      access_token,
    );
  }

  private async updateMicrosoftCalendarEvent(
    calendarEventId: string,
    isComplete: boolean,
    req: Request,
  ) {
    const endpoint = `https://graph.microsoft.com/v1.0/me/calendar/events/${calendarEventId}`;
    const access_token = await this.graphService.getAccessToken(req);
    await this.graphService.patchMicrosoftResource(
      endpoint,
      { isCancelled: isComplete },
      access_token,
    );
  }

  async deleteTask(id: string) {
    try {
      return await this.prisma.task.delete({ where: { id } });
    } catch (err) {
      prismaError(err);
    }
  }
}
