import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-column-type',
  templateUrl: './column-type.component.html',
  styleUrls: ['./column-type.component.css']
})
export class ColumnTypeComponent implements OnInit {
  name = 'NAZWA TYPU';
  columnType = 'TYP';

  constructor() {
  }

  ngOnInit() {
  }

}
