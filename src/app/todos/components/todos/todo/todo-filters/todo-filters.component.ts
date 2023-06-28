import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FilterType } from 'src/app/todos/models/todos.models'
import { LoggerService } from '../../../../../shared/services/logger.service';

@Component({
  selector: 'tl-todo-filters',
  templateUrl: './todo-filters.component.html',
  styleUrls: ['./todo-filters.component.css'],
})
export class TodoFiltersComponent {
  @Output() changeFilterEvent = new EventEmitter<FilterType>()
  @Input() filter!: FilterType

  constructor(private loggerService: LoggerService) {}
  changeFilterHandler(filter: FilterType) {
    this.loggerService.info('Change filter', 'TodoFiltersComponent', filter);
    this.changeFilterEvent.emit(filter)
  }
}
