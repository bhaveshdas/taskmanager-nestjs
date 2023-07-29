// import { Injectable, NotFoundException } from '@nestjs/common';
// import { Repository } from 'typeorm';

// import { TaskStatus } from './tasks-status.enum';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Task } from './task.entity';
// @Injectable()
// export class TasksService {
//   constructor(
//     @InjectRepository(Task)
//     private taskRepository: Repository<Task>,
//   ) {}
//   // getAllTasks(): Task[] {
//   //   return this.tasks;
//   // }
//   async getTaskById(id: string): Promise<Task> {
//     const found = await this.taskRepository.findOne({ where: { id: id } });
//     if (!found) {
//       throw new NotFoundException(`task with ID "${id}" does not exist `);
//     }
//     return found;
//   }

//   async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
//     const task = this.taskRepository.create({
//       ...createTaskDto,
//       status: TaskStatus.OPEN,
//     });
//     await this.taskRepository.save(task);
//     return task;
//   }

//   // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
//   //   const { status, search } = filterDto;

//   //   let tasks = this.getAllTasks();

//   //   if (status) {
//   //     tasks = tasks.filter((task) => task.status === status);
//   //   }

//   //   if (search) {
//   //     tasks = tasks.filter((task) => {
//   //       if (task.title.includes(search) || task.description.includes(search)) {
//   //         return true;
//   //       }
//   //       return false;
//   //     });
//   //   }
//   //   return tasks;
//   // }
//   // deleteTaskById(id: string): void {
//   //   const found = this.getTaskById(id);
//   //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
//   // }
//   // createTask(createTaskDto: CreateTaskDto): Task {
//   //   const { title, description } = createTaskDto;
//   //   const task: Task = {
//   //     id: uuid(),
//   //     title,
//   //     description,
//   //     status: TaskStatus.OPEN,
//   //   };
//   //   this.tasks.push(task);

//   //   return task;
//   // }
//   // updateTaskStatus(id: string, status: TaskStatus): Task {
//   //   const task = this.getTaskById(id);
//   //   task.status = status;
//   //   return task;
// }
import { Injectable } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './tasks.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private taskEntityRepository: TaskRepository) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskEntityRepository.findAll(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    return this.taskEntityRepository.findById(id, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskEntityRepository.insert(createTaskDto, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    return this.taskEntityRepository.deleteById(id, user);
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    return this.taskEntityRepository.updateTaskStatus(id, status, user);
  }
}
