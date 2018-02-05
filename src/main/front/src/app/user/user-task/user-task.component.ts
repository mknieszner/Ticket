import {Component, Input, OnInit} from '@angular/core';
import {Status, TaskModel} from "../../shared/table.model";
import {FormControl, FormGroup} from "@angular/forms";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  styleUrls: ['./user-task.component.css']
})
export class UserTaskComponent implements OnInit {
  @Input() task: TaskModel;
  editedTaskForm: FormGroup;
  editTaskMode: boolean = false;
  status = Status;

  constructor(private dss: DataStorageService) {
  }

  ngOnInit() {
  }

  onEditTaskMode(mode: boolean) {
    this.editTaskMode = mode;
    if(this.task){
      this.editedTaskForm = new FormGroup({
        name: new FormControl(this.task.name),
        description: new FormControl(this.task.description),
        status: new FormControl(this.task.status),
      });
    }
  }

  onSaveEditedTask(payload: { name: string, description: string, status: Status }) {
    let task:TaskModel = {
      id: this.task.id,
      name: this.editedTaskForm.value.name,
      description: this.editedTaskForm.value.description,
      status: this.editedTaskForm.value.status,
      userNames: this.task.userNames,
      taskDtos: this.task.taskDtos
    }
    console.log(task);
    this.dss.updateTask(task);
  }
}
