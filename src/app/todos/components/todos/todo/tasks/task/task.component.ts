import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Task, UpdateTaskRequest } from 'src/app/todos/models/tasks.models'
import { TaskStatusEnum } from 'src/app/core/enums/taskStatus.enum'

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task!: Task
  @Output() deleteTaskEvent = new EventEmitter<string>()
  @Output() changeTaskEvent = new EventEmitter<{ taskId: string; newTask: UpdateTaskRequest }>()
  taskStatusEnum = TaskStatusEnum
  editMode = false
  newTitle = ''

  deleteTaskHandler() {
    this.deleteTaskEvent.emit(this.task.id)
  }

  changeTaskStatusHandler(event: MouseEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked

    this.changeTask({
      status: newStatus ? this.taskStatusEnum.completed : this.taskStatusEnum.active,
    })
  }

  activateEditModeHandler() {
    this.newTitle = this.task.title
    this.editMode = true
  }

  changeTitleHandler() {
    this.editMode = false
    this.changeTask({ title: this.newTitle })
    this.newTitle = ''
  }

  changeTask(patch: Partial<UpdateTaskRequest>) {
    const newTask: UpdateTaskRequest = {
      status: this.task.status,
      description: this.task.description,
      completed: this.task.completed,
      deadline: this.task.deadline,
      priority: this.task.priority,
      startDate: this.task.startDate,
      title: this.task.title,
      ...patch,
    }
    this.changeTaskEvent.emit({ taskId: this.task.id, newTask })
  }
}
