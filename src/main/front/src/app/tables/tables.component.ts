import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ExtendedFilterModel, RowContentModel, TableDefinitionModel} from '../shared/table.model';
import {Observable} from 'rxjs/Observable';
import {DataStorageService} from "../shared/data-storage.service";
import * as fromAppReducers from '../shared/store/app.reducers'
import * as fromTableReducers from '../shared/store/table/tables.reducers'
import * as TablesActions from "../shared/store/table/tables.actions";
import * as UsersAction from "../shared/store/user/users.actions";
import {SortModel} from "../shared/sort/sort.model";
import {TableState} from "../shared/store/table/tables.reducers";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  tableState: Observable<fromTableReducers.TableState>;
  tableChosen: boolean = false;
  taskDetailsMode: Observable<boolean>;
  extendedFilterContentState: Observable<ExtendedFilterModel>;
  extendedFilterContent: ExtendedFilterModel;
  filterSelect: boolean;
  sortContent: Observable<SortModel>;
  sortContentValue: SortModel;

  showSpinner:boolean = true;


  constructor(private contentStore: Store<fromAppReducers.AppState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.dss.getTableNames();
    this.tableState = this.contentStore.select('tables');
    this.tableState.subscribe((table: TableState) => {
      if( table.tableContent.length > 0 && table.tableDefinition ){
        this.showSpinner = false;
        console.log(this.showSpinner, table.tableContent, table.tableDefinition);
      } else {
        this.showSpinner = true;
        console.log(this.showSpinner, table.tableContent, table.tableDefinition);
      }
    });
    this.taskDetailsMode = this.contentStore.select('tasks', 'taskDetailsMode');
    this.contentStore.select('tables', 'extendedFilterContent').subscribe((extendedFilterContent: ExtendedFilterModel) => {
      this.extendedFilterContent = extendedFilterContent;
    });
    this.contentStore.select('tables', 'filterSelect').subscribe((filterSelect: boolean) => {
      this.filterSelect = filterSelect;
    });
    this.sortContent = this.contentStore.select('tables', 'sortContent');
    this.sortContent.subscribe((sortContent: SortModel) => {
      this.sortContentValue = sortContent
    })
  }

  onToggleRowEditMode() {
    this.contentStore.dispatch(new TablesActions.SetEditRowMode(false));
  }

  setTable(tableName) {//TODO: RESET STANU PO ZMIANIE STOLU
    this.showSpinner = true;
    this.contentStore.dispatch(new TablesActions.SwitchTableReset());
    this.contentStore.dispatch(new UsersAction.SwitchTableReset());
    this.dss.getTableHeaderByName(tableName);
    this.dss.getTableRowsByName(tableName);
    this.tableChosen = true;
  }
}
