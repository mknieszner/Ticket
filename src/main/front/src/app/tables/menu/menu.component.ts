import {Component, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() tableNames: string[];
  choosenName: string;
  @Output() choosenNameChanged = new Subject<string>();

  constructor() {
  }

  ngOnInit() {
  }

  onChooseName(tableName: string) {
    this.choosenName = tableName;
    this.choosenNameChanged.next(tableName);
  }
}
