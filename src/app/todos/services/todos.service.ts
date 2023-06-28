import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { BehaviorSubject } from 'rxjs'
import { DomainTodo, FilterType, Todo } from 'src/app/todos/models/todos.models'
import { CommonResponseType } from 'src/app/core/models/core.models'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$ = new BehaviorSubject<DomainTodo[]>([])

  constructor(private http: HttpClient) {}

  getTodos() {
    this.http
      .get<Todo[]>(`${environment.baseUrl}/todo-lists`)
      .pipe(
        map(todos => {
          const newTodos: DomainTodo[] = todos.map(el => ({ ...el, filter: 'all' }))
          return newTodos
        })
      )
      .subscribe(res => {
        this.todos$.next(res)
      })
  }

  addTodo(title: string) {
    this.http
      .post<
        CommonResponseType<{
          item: Todo
        }>
      >(`${environment.baseUrl}/todo-lists`, { title })
      .pipe(
        map(res => {
          const stateTodos = this.todos$.getValue()
          const newTodo: DomainTodo = { ...res.data.item, filter: 'all' }
          return [newTodo, ...stateTodos]
        })
      )

      .subscribe((res: DomainTodo[]) => {
        this.todos$.next(res)
      })
  }

  deleteTodo(todoId: string) {
    this.http
      .delete<CommonResponseType>(`${environment.baseUrl}/todo-lists/${todoId}`)
      .pipe(
        map(() => {
          const stateTodo = this.todos$.getValue()
          return stateTodo.filter(el => el.id !== todoId)
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }
  updateTodoTitle(todoId: string, title: string) {
    this.http
      .put<CommonResponseType>(`${environment.baseUrl}/todo-lists/${todoId}`, { title })
      .pipe(
        map(() => {
          const stateTodo = this.todos$.getValue()
          return stateTodo.map(todo => (todo.id === todoId ? { ...todo, title } : todo))
        })
      )
      .subscribe(res => {
        this.todos$.next(res)
      })
  }
  changeFilter(todoId: string, filter: FilterType) {
    const stateTodos = this.todos$.getValue()
    const newTodos: DomainTodo[] = stateTodos.map(el => (el.id === todoId ? { ...el, filter } : el))
    this.todos$.next(newTodos)
  }
}
