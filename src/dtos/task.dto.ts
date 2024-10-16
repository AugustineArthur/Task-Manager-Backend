import { IsNotEmpty, IsString, IsOptional, IsDate, IsEnum } from 'class-validator';

enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export class CreateTaskDTO {
  @IsNotEmpty()
    @IsString()
    title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
    @IsEnum(TaskStatus)
    status!: TaskStatus;

  @IsOptional()
  @IsDate()
  due_date?: Date;
}

export class UpdateTaskDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsDate()
  due_date?: Date;
}
