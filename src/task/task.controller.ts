import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/task.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getallTasks() {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  getTask(@Param('id') id: string) {
    return this.taskService.getTask(id);
  }

  @Get('user/:id')
  getTasksByUser(@Param('id') id: string) {
    return this.taskService.getTasksByUser(id);
  }

  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
