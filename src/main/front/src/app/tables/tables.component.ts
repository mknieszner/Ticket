import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RowContentModel, TableDefinitionModel} from '../shared/row.model';
import {Observable} from 'rxjs/Observable';
import {DataStorageService} from "../shared/data-storage.service";
import * as fromTableReducers from '../shared/store/tables.reducers'
import * as TablesActions from "../shared/store/tables.actions";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  tableState:Observable<fromTableReducers.State>;
  tableChosen = false;
  newRowMode: Observable<boolean>;

  constructor(private contentStore: Store<fromTableReducers.AppState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.tableState = this.contentStore.select('tables');
    this.newRowMode = this.contentStore.select('tables','newRowMode');
    this.dss.getTableNames();
  }
  //
  // onNewRow() {
  //   this.newRowMode = true;
  // }

  onToggleRowEditMode() {
    this.contentStore.dispatch(new TablesActions.SetNewRowModeAction(false));
  }


  setTable(tableName) {
    this.dss.getTableHeaderByName(tableName);
    this.dss.getTableRowsByName(tableName);
    this.tableChosen = true;
  }
}
