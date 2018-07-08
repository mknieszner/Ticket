import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromAppReducers from '../shared/store/app.reducers';
import {Observable} from 'rxjs/Observable';
import {TableState} from '../shared/store/table/tables.reducers';
import {DataStorageService} from '../shared/data-storage.service';
import * as StatisticsActions from '../shared/store/statistics/statistics.actions';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  tableState: Observable<TableState>;
  selectedTableName: Observable<string>;

  constructor(private store: Store<fromAppReducers.AppState>,
              private dss: DataStorageService) { }

  ngOnInit() {
    this.dss.getTablesDetails();
    this.tableState = this.store.select('tables');
    this.selectedTableName = this.store.select('statistics', 'selectedTableName');
  }

  onSelectTableName(tableName: string) {
    this.store.dispatch(new StatisticsActions.SetSelectedTableName(tableName));
  }
}
