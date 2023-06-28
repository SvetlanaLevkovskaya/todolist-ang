import { Component, OnInit } from '@angular/core'
import { TodosService } from 'src/app/todos/services/todos.service'
import { Observable } from 'rxjs'
import { DomainTodo } from 'src/app/todos/models/todos.models'
import { AuthService } from 'src/app/core/services/auth.service'
import { LoggerService } from '../../../shared/services/logger.service';

@Component({
  selector: 'tl-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos$?: Observable<DomainTodo[]>
  todoTitle = ''
  constructor(private todosService: TodosService, private authService: AuthService, private logger: LoggerService) {}

  ngOnInit(): void {
    this.logger.info('TodosComponent initialized', 'TodosComponent');
    this.todos$ = this.todosService.todos$;
    this.todosService.getTodos();
  }

  addTodoHandler() {
    this.logger.info('New Todo added', 'TodosComponent');
    this.todosService.addTodo(this.todoTitle);
    this.todoTitle = '';
  }

  deleteTodo(todoId: string) {
    this.logger.error('Todo deleted', 'TodosComponent', { todoId });
    this.todosService.deleteTodo(todoId);
  }

  editTodo(data: { todoId: string; title: string }) {
    this.logger.warn('Todo updated', 'TodosComponent', { todoId: data.todoId, title: data.title });
    this.todosService.updateTodoTitle(data.todoId, data.title);
  }

  logoutHandler() {
    this.logger.info('Logout', 'TodosComponent');
    this.authService.logout();
  }
}
