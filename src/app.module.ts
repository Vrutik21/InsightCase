import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma/prisma.service';
import { CaseModule } from './case/case.module';
import { ClientModule } from './client/client.module';
import { ServiceModule } from './service/service.module';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { TaskModule } from './task/task.module';

@Module({
  imports: [AuthModule, PrismaModule, CaseModule, ClientModule, ServiceModule, TaskModule],
  controllers: [AppController, TaskController],
  providers: [AppService, JwtService, PrismaService, TaskService],
})
export class AppModule {}
