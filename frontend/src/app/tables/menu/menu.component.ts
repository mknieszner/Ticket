import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Store} from '@ngrx/store';
import * as fromAppReducers from '../../shared/store/app.reducers';
import * as TablesActions from '../../shared/store/table/tables.actions';
import {Observable} from 'rxjs/Observable';
import {TablesDetails} from "../../shared/table.model";
import {ConstantsService} from "../../shared/constants.service";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  @Input() parent: string;
  @Output() chosenNameChanged = new Subject<TablesDetails>();
  tablesDetails: TablesDetails[];

  tableNames: string[] = [];
  chosenName: string;
  extendedFilterMode: Observable<boolean>;
  extendedTableView: Observable<boolean>;
  extendedTableViewValue: boolean;
  extendedFilterModeValue: boolean;


  constructor(private store: Store<fromAppReducers.AppState>,
              private dss: DataStorageService,
              public constants: ConstantsService) {
  }

  setFilterSelectValue(value: boolean) {
    this.store.dispatch(new TablesActions.SetExtendedFilterSelect(value));
  }

  ngOnInit() {
    this.store.select("tables", "tablesDetails").subscribe((details) => {
      this.tablesDetails = details;
    });
    this.extendedFilterMode = this.store.select('tables', 'extendedFilterMode');
    this.extendedFilterMode.subscribe((filterModeValue => {
      this.extendedFilterModeValue = filterModeValue;
    }));
    this.extendedTableView = this.store.select('tables', 'extendedTableView');
    this.extendedTableView.subscribe((value) => {
      this.extendedTableViewValue = value;
    });
    this.tablesDetails.forEach(tableDetails => this.tableNames.push(tableDetails.name));
  }

  onChooseName(tableName: string) {
    this.chosenName = tableName;
    const tableDetails = this.tablesDetails.find((tableDetails) => tableDetails.name === tableName);
    this.chosenNameChanged.next(tableDetails);
  }

  onFilter(filter) {
    this.store.dispatch(new TablesActions.TableFilter(filter));
  }

  onNewRow() {
    this.store.dispatch(new TablesActions.SetEditRowMode(true));
    this.store.dispatch(new TablesActions.SetNewRowModeAction(true));
  }

  switchExtendedTableView() {
    if (this.extendedFilterModeValue && this.extendedTableViewValue) {
      this.onExtendedFilterMode()
    }
    this.store.dispatch(new TablesActions.SetExtendedTableView(!this.extendedTableViewValue));
  }

  onExtendedFilterMode() {
    this.store.dispatch(new TablesActions.SetExtendedFilterMode(!this.extendedFilterModeValue));
  }

  deleteTable(tableId: number) {
    this.dss.deleteProject(tableId);
  }

  ngOnDestroy() {
    this.dss.getTablesDetails();
  }
}
