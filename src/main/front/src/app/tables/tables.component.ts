import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RowContentModel, TableDefinitionModel} from '../shared/table.model';
import {Observable} from 'rxjs/Observable';
import {DataStorageService} from "../shared/data-storage.service";
import * as fromAppReducers from '../shared/store/app.reducers'
import * as fromTableReducers from '../shared/store/table/tables.reducers'
import * as TablesActions from "../shared/store/table/tables.actions";
import * as UsersAction from "../shared/store/user/users.actions";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  tableState: Observable<fromTableReducers.TableState>;
  tableChosen: boolean;
  taskDetailsMode: Observable<boolean>;


  constructor(private contentStore: Store<fromAppReducers.AppState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.dss.getTableNames();
    this.tableState = this.contentStore.select('tables');
    this.taskDetailsMode = this.contentStore.select('tasks','taskDetailsMode');
  }

  onToggleRowEditMode() {
    this.contentStore.dispatch(new TablesActions.SetEditRowMode(false));
  }

  setTable(tableName) {//TODO: RESET STANU PO ZMIANIE STOLU
    this.contentStore.dispatch(new TablesActions.SwitchTableReset());
    this.contentStore.dispatch(new UsersAction.SwitchTableReset());
    this.dss.getTableHeaderByName(tableName);
    this.dss.getTableRowsByName(tableName);
    this.tableChosen = true;
  }
}
