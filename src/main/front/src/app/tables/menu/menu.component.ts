import {Component, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Store} from "@ngrx/store";
import * as fromAppReducers from '../../shared/store/app.reducers'
import * as TablesActions from "../../shared/store/table/tables.actions";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() tableNames: string[];
  choosenName: string;
  @Output() choosenNameChanged = new Subject<string>();
  extendedFilterMode: Observable<boolean>;
  extendedFilterAction: Observable<boolean>;
  extendedTableView: Observable<boolean>;
  extendedTableViewValue: boolean


  constructor(private store: Store<fromAppReducers.AppState>) {
  }

  ngOnInit() {
    this.extendedFilterMode = this.store.select('tables', 'extendedFilterMode');
    this.extendedFilterAction = this.store.select('tables', 'extendedFilterAction')
    this.extendedTableView = this.store.select('tables','extendedTableView');
    this.extendedTableView.subscribe((value)=>{
      this.extendedTableViewValue = value;
    })
  }

  onChooseName(tableName: string) {
    this.choosenName = tableName;
    this.choosenNameChanged.next(tableName);
  }

  onFilter(value: string) {
    this.store.dispatch(new TablesActions.TableFilter(value))
  }

  onExtendedFilterMode() {
    this.store.dispatch(new TablesActions.SetExtendedFilterMode());
  }

  onRunExtendedFilter() {
      this.store.dispatch(new TablesActions.RunExtendedFilter());//true
  }

  onNewRow() {
    //TODO new Row
    this.store.dispatch(new TablesActions.SetEditRowMode(true));
    this.store.dispatch(new TablesActions.SetNewRowModeAction(true));
  }

  switchExtendedTableView() {
  this.store.dispatch(new TablesActions.SetExtendedTableView(!this.extendedTableViewValue))
  }
}
