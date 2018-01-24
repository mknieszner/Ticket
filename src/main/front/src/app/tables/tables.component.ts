import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RowContentModel, TableDefinitionModel} from '../shared/row.model';
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
  // editRowMode: Observable<boolean>;
  // editedRow: Observable<RowContentModel>;

  constructor(private contentStore: Store<fromAppReducers.AppState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.dss.getTableNames();
    this.tableState = this.contentStore.select('tables');
    // this.editRowMode = this.contentStore.select('tables', 'editRowMode');
    // this.editedRow = this.contentStore.select('tables', 'editedRow');

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

  sort: any = {
    column: 'id', //to match the variable of one of the columns
    descending: false
  };

  selectedClass(columnName): string{
    return columnName == this.sort.column ? 'sort-' + this.sort.descending : 'false';
  }

  changeSorting(columnName): void{
    const sort = {
      column: 'id', //to match the variable of one of the columns
      descending: false
    };
    if (sort.column == columnName) {
      sort.descending = !sort.descending;
    } else {
      sort.column = columnName;
      sort.descending = false;
    }
  }

  convertSorting(): string{
    return this.sort.descending ? '-' + this.sort.column : this.sort.column;
  }
}
