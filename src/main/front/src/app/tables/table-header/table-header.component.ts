import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ExtendedFilterModel, RowContentModel, TableDefinitionModel} from '../../shared/row.model';
import {Store} from "@ngrx/store";
import * as fromTableReducers from '../../shared/store/tables.reducers';
import {Observable} from "rxjs/Observable";
import * as TablesActions from "../../shared/store/tables.actions";
import {Form, FormArray, FormControl, FormGroup} from "@angular/forms";
import {Question} from "../table/value-types/question-base.model";

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css']
})
export class TableHeaderComponent implements OnInit {
  header: Observable<TableDefinitionModel>;
  editRowMode: Observable<boolean>;
  extendedFilterMode: Observable<boolean>;
  filterForm: FormGroup;
  extendedFilterAction: Observable<boolean>;

  constructor(private contentStore: Store<fromTableReducers.AppState>) {
  }

  ngOnInit() {
    this.extendedFilterAction = this.contentStore.select('tables', 'extendedFilterAction');
    this.header = this.contentStore.select('tables', 'tableDefinition');
    this.editRowMode = this.contentStore.select('tables', 'editRowMode');
    this.extendedFilterMode = this.contentStore.select('tables', 'extendedFilterMode');
    this.extendedFilterMode.subscribe((mode) => {
        if (mode) {
          // console.log(mode);
          this.header.forEach((header) => {
            if(header){
              this.setForm(header)
            }
          })
        } else {
          // console.log(mode);
          this.filterForm = null;
        }
      }
    );
    this.extendedFilterAction.subscribe((action: boolean) => {
      // console.log('table-header subscribe extendedFilterAction');
      if (action) {
        this.contentStore.dispatch(new TablesActions.SetExtendedFilter(this.getFormValues()));
        // console.log('table-header subscribe extendedFilterAction aciton true');
      } else {
        // console.log('table-header subscribe extendedFilterAction aciton false');
        this.contentStore.dispatch(new TablesActions.SetExtendedFilter(null));
      }
    })
  }

  setForm(header: TableDefinitionModel) {
    // console.log(header, 'rebuild');
    this.filterForm = new FormGroup({
      'id': new FormControl(),
      'name': new FormControl(),
      'createdBy': new FormControl(),
      'createdOn': new FormControl(),
      'lastModifiedBy': new FormControl(),
      'lastModifiedOn': new FormControl(),
      'columnValueDtos': new FormArray([])
    });

    header[0].columnDetailDefinitionDtoList.forEach((cell, i) => {
      const columnName: string = 'columnValueDtos' + i;
      // console.log('name: ', name);
      (<FormArray>this.filterForm.get('columnValueDtos')).push(new FormGroup({
        'value': new FormControl()
      }));
    })
  }

  show(toShow) {
    // console.log(this.filterForm);
    // console.log(this.header);
  }

  onNewRow() {
    // console.log('aaa')
    this.contentStore.dispatch(new TablesActions.SetEditRowMode(true));
  }

  getFormValues(): ExtendedFilterModel {
    console.log(this.filterForm.value);
    return this.filterForm.value;
  }
}
