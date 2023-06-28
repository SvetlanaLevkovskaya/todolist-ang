import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'
import {
  DomainTask,
  GetTasksResponse,
  Task,
  UpdateTaskRequest,
} from 'src/app/todos/models/tasks.models'
import { environment } from 'src/environments/environment'
import { map } from 'rxjs/operators'
import { CommonResponseType } from 'src/app/core/models/core.models'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks$ = new BehaviorSubject<DomainTask>({})
  constructor(private http: HttpClient) {}
  getTasks(todoId: string) {
    this.http
      .get<GetTasksResponse>(`${environment.baseUrl}/todo-lists/${todoId}/tasks`)
      .pipe(map(res => res.items))
      .subscribe((res: Task[]) => {
        const stateTasks = this.tasks$.getValue()
        stateTasks[todoId] = res
        this.tasks$.next(stateTasks)
      })
  }
  addTask(todoId: string, title: string) {
    this.http
      .post<CommonResponseType<{ item: Task }>>(
        `${environment.baseUrl}/todo-lists/${todoId}/tasks`,
        { title }
      )
      .pipe(
        map(res => {
          const stateTasks = this.tasks$.getValue()
          const newTask = res.data.item
          const newTasks = [newTask, ...stateTasks[todoId]]
          stateTasks[todoId] = newTasks
          return stateTasks
        })
      )
      .subscribe(res => {
        this.tasks$.next(res)
      })
  }
  deleteTask(todoId: string, taskId: string) {
    this.http
      .delete<CommonResponseType>(`${environment.baseUrl}/todo-lists/${todoId}/tasks/${taskId}`)
      .pipe(
        map(() => {
          const stateTasks = this.tasks$.getValue()
          const taskForTodo = stateTasks[todoId]
          stateTasks[todoId] = taskForTodo.filter(({ id }) => id !== taskId)
          return stateTasks
        })
      )
      .subscribe(res => {
        this.tasks$.next(res)
      })
  }

  updateTask(todoId: string, taskId: string, newTask: UpdateTaskRequest) {
    this.http
      .put<CommonResponseType<{ item: Task }>>(
        `${environment.baseUrl}/todo-lists/${todoId}/tasks/${taskId}`,
        newTask
      )
      .pipe(
        map(() => {
          const stateTasks = this.tasks$.getValue()
          const tasksForTodo = stateTasks[todoId]
          const newTasks = tasksForTodo.map((el: Task) =>
            el.id === taskId ? { ...el, ...newTask } : el
          )
          stateTasks[todoId] = newTasks
          return stateTasks
        })
      )
      .subscribe(res => {
        this.tasks$.next(res)
      })
  }
}
