import {Component, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Store} from '@ngrx/store';
import * as fromAppReducers from '../../shared/store/app.reducers';
import * as TablesActions from '../../shared/store/table/tables.actions';
import {Observable} from 'rxjs/Observable';
import {TablesDetails} from "../../shared/table.model";
import {ConstantsService} from "../../shared/constants.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() tablesDetails: TablesDetails[];
  @Output() chosenNameChanged = new Subject<TablesDetails>();

  tableNames: string[] = [];
  chosenName: string;
  extendedFilterMode: Observable<boolean>;
  extendedTableView: Observable<boolean>;
  extendedTableViewValue: boolean;


  constructor(private store: Store<fromAppReducers.AppState>, public constants: ConstantsService) {
  }

  setFilterSelectValue(value: boolean) {
    console.log('setFilterSelectValue', value);
    this.store.dispatch(new TablesActions.SetExtendedFilterSelect(value));
  }

  ngOnInit() {
    this.extendedFilterMode = this.store.select('tables', 'extendedFilterMode');
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
    console.log(filter);
    this.store.dispatch(new TablesActions.TableFilter(filter));
  }

  onNewRow() {
    // TODO new Row
    this.store.dispatch(new TablesActions.SetEditRowMode(true));
    this.store.dispatch(new TablesActions.SetNewRowModeAction(true));
  }

  switchExtendedTableView() {
    this.store.dispatch(new TablesActions.SetExtendedTableView(!this.extendedTableViewValue));
  }

  onExtendedFilterMode() {
    this.store.dispatch(new TablesActions.SetExtendedFilterMode());
  }
}
