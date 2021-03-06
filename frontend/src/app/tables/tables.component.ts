import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ExtendedFilterModel, TablesDetails} from '../shared/table.model';
import {Observable} from 'rxjs/Observable';
import {DataStorageService} from '../shared/data-storage.service';
import * as fromAppReducers from '../shared/store/app.reducers';
import * as fromTableReducers from '../shared/store/table/tables.reducers';
import * as TablesActions from '../shared/store/table/tables.actions';
import * as UsersAction from '../shared/store/user/users.actions';
import {SortModel} from '../shared/sort/sort.model';
import * as TaskActions from "../shared/store/task/tasks.actions";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit, OnDestroy {
  tableState: Observable<fromTableReducers.TableState>;
  tableChosen = false;
  taskDetailsMode: Observable<boolean>;
  extendedFilterContent: ExtendedFilterModel;
  filterSelect: boolean;
  sortContent: Observable<SortModel>;
  sortContentValue: SortModel;

  showSpinner = true;


  constructor(private contentStore: Store<fromAppReducers.AppState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.dss.getTablesDetails();
    this.tableState = this.contentStore.select('tables');
    this.tableState.subscribe(() => {
      this.showSpinner = false;
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
      this.sortContentValue = sortContent;
    });
  }

  setTable(tablesDetails: TablesDetails) {
    this.showSpinner = true;
    this.contentStore.dispatch(new TablesActions.SwitchTableReset());
    this.contentStore.dispatch(new UsersAction.SwitchTableReset());
    this.contentStore.dispatch(new TaskActions.ResetTaskStore());
    this.dss.getTableHeaderBy(tablesDetails.id);
    this.dss.getTableRowsBy(tablesDetails.id);
    this.tableChosen = true;
  }

  ngOnDestroy(): void {
    this.contentStore.dispatch(new TaskActions.ResetTaskStore());
    this.contentStore.dispatch(new TablesActions.SwitchTableReset());
  }
}
