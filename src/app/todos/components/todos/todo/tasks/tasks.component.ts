import { Component, Input, OnInit } from '@angular/core'
import { TasksService } from 'src/app/todos/services/tasks.service'
import { combineLatest, Observable } from 'rxjs'
import { Task, UpdateTaskRequest } from 'src/app/todos/models/tasks.models'
import { map } from 'rxjs/operators'
import { TodosService } from 'src/app/todos/services/todos.service'
import { TaskStatusEnum } from 'src/app/core/enums/taskStatus.enum'

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string
  tasks$?: Observable<Task[]>
  taskTitle = ''
  constructor(private tasksService: TasksService, private todosService: TodosService) {}

  ngOnInit(): void {
    //subscribe
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
    this.tasksService.addTask(this.todoId, this.taskTitle)
    this.taskTitle = ''
  }

  deleteTask(taskId: string) {
    this.tasksService.deleteTask(this.todoId, taskId)
  }

  changeTaskStatus(event: { taskId: string; newTask: UpdateTaskRequest }) {
    this.tasksService.updateTask(this.todoId, event.taskId, event.newTask)
  }
}
