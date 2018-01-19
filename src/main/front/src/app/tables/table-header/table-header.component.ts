import {Component, Input, OnInit} from '@angular/core';
import {TableDefinitionModel} from '../../shared/row.model';
import {Store} from "@ngrx/store";
import * as fromTableReducers from '../../shared/store/tables.reducers';
import {Observable} from "rxjs/Observable";
import * as TablesActions from "../../shared/store/tables.actions";

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css']
})
export class TableHeaderComponent implements OnInit {
  header: Observable<TableDefinitionModel>;
  newRowMode:Observable<boolean>;
  constructor(private contentStore: Store<fromTableReducers.AppState>) { }

  ngOnInit() {
    this.header = this.contentStore.select('tables','tableDefinition');
    this.newRowMode = this.contentStore.select('tables','newRowMode');
    // console.log('TableHeaderComponent');
    // this.header.subscribe(console.log);
  }

  show(toShow){
    console.log(toShow);
  }

  onNewRow() {
    // console.log('aaa')
    this.contentStore.dispatch(new TablesActions.SetNewRowModeAction(true));
  }
}
