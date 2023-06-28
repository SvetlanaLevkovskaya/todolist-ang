import { Component, Input, OnInit } from '@angular/core'
import { TasksService } from 'src/app/todos/services/tasks.service'
import { combineLatest, Observable } from 'rxjs'
import { Task, UpdateTaskRequest } from 'src/app/todos/models/tasks.models'
import { map } from 'rxjs/operators'
import { TodosService } from 'src/app/todos/services/todos.service'
import { TaskStatusEnum } from 'src/app/core/enums/taskStatus.enum'
import { LoggerService } from '../../../../../shared/services/logger.service';

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string
  tasks$?: Observable<Task[]>
  taskTitle = ''
  constructor(private tasksService: TasksService, private todosService: TodosService, private loggerService: LoggerService) {}

  ngOnInit(): void {
    //subscribe
    this.loggerService.info('TasksComponent initialized', 'TasksComponent');
    this.tasks$ = combineLatest([this.tasksService.tasks$, this.todosService.todos$]).pipe(
      map(res => {
        const tasks = res[0]
        let tasksForTodo = tasks[this.todoId]
        const todos = res[1]
        const activeTodo = todos.find(tl => tl.id === this.todoId)
        if (activeTodo?.filter === 'completed') {
          tasksForTodo = tasksForTodo.filter(el => el.status === TaskStatusEnum.completed)
        }
        if (activeTodo?.filter === 'active') {
          tasksForTodo = tasksForTodo.filter(el => el.status === TaskStatusEnum.active)
        }
        return tasksForTodo
      })
    )
    this.tasksService.getTasks(this.todoId)
  }

  addTaskHandler() {
    this.loggerService.info('Add task handler called', 'TasksComponent');
    this.tasksService.addTask(this.todoId, this.taskTitle)
    this.taskTitle = ''
  }

  deleteTask(taskId: string) {
    this.loggerService.info('Deleting task with ID: ' + taskId, 'TasksComponent');
    this.tasksService.deleteTask(this.todoId, taskId)
  }

  changeTaskStatus(event: { taskId: string; newTask: UpdateTaskRequest }) {
    this.loggerService.info('Changing task status for task with ID: ' + event.taskId, 'TasksComponent');
    this.tasksService.updateTask(this.todoId, event.taskId, event.newTask)
  }
}
