import {Component, Input, OnInit} from '@angular/core';
import {TaskModel} from "../../shared/table.model";

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html'
})
export class UserTaskComponent implements OnInit {
  @Input() task: TaskModel;

  constructor() { }

  ngOnInit() {
  }

}
