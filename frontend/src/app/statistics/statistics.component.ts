import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {COMMON_TABLE_ENVIRONMENT} from "../definition/definition.component"
import * as fromAppReducers from '../shared/store/app.reducers';
import {Observable} from 'rxjs/Observable';
import {TableState} from '../shared/store/table/tables.reducers';
import {DataStorageService} from '../shared/data-storage.service';
import * as StatisticsActions from '../shared/store/statistics/statistics.actions';
import {TablesDetails} from "../shared/table.model";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  tableState: Observable<TableState>;
  selectedTableName: Observable<string>;
  public COMMON_TABLE_ENVIRONMENT = COMMON_TABLE_ENVIRONMENT;

  constructor(private store: Store<fromAppReducers.AppState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.dss.getTablesDetails();
    this.tableState = this.store.select('tables');
    this.selectedTableName = this.store.select('statistics', 'selectedTableName');
  }

  onSelectTableName(tablesDetails: TablesDetails) {
    if (this.isSupported(tablesDetails)) {
      this.store.dispatch(new StatisticsActions.SetSelectedTableName(tablesDetails.name));
    }
  }

  public isSupported(tablesDetails: TablesDetails): boolean {
    return tablesDetails.databaseEnvironment === COMMON_TABLE_ENVIRONMENT;
  }
}
