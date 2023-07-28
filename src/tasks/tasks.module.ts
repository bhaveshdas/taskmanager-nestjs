// import { Module } from '@nestjs/common';
// import { TasksController } from './tasks.controller';
// // import { TasksService } from './tasks.service';

// @Module({
//   controllers: [TasksController],
//   //   providers: [TasksService],
// })
// export class TaskModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './tasks.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
})
export class TasksModule {}