import {Component, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Store} from "@ngrx/store";
import * as fromTableReducers from '../../shared/store/tables.reducers'
import * as TablesActions from "../../shared/store/tables.actions";
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

  constructor(private store: Store<fromTableReducers.AppState>) {
  }

  ngOnInit() {
    this.extendedFilterMode = this.store.select('tables', 'extendedFilterMode');
    this.extendedFilterAction = this.store.select('tables', 'extendedFilterAction')
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
    // console.log('onRunExtendedFilter');
      this.store.dispatch(new TablesActions.RunExtendedFilter());//true
  }

  onNewRow() {
    //TODO new Row
    console.log('onNewRow');
    this.store.dispatch(new TablesActions.SetEditRowMode(true));
    this.store.dispatch(new TablesActions.SetNewRowModeAction(true));
  }

}
