import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ExtendedFilterModel, RowContentModel, TableDefinitionModel} from '../../shared/table.model';
import {Store} from "@ngrx/store";
import * as fromAppReducers from '../../shared/store/app.reducers';
import {Observable} from "rxjs/Observable";
import * as TablesActions from "../../shared/store/table/tables.actions";
import {Form, FormArray, FormControl, FormGroup} from "@angular/forms";
import {Question} from "../row/value-types/question-base.model";
import {SortModel} from "../../shared/sort/sort.model";

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
  extendedTableView: Observable<boolean>;
  sortContent: SortModel;

  constructor(private contentStore: Store<fromAppReducers.AppState>) {
  }

  ngOnInit() {
    this.contentStore.select('tables', 'sortContent').subscribe((sortContent: SortModel)=>{
      this.sortContent = sortContent;
    })
    this.extendedTableView = this.contentStore.select('tables','extendedTableView');
    this.header = this.contentStore.select('tables', 'tableDefinition');
    this.editRowMode = this.contentStore.select('tables', 'editRowMode');
    this.extendedFilterMode = this.contentStore.select('tables', 'extendedFilterMode');
    this.extendedFilterMode.subscribe((mode) => {
        if (mode) {
          this.header.forEach((header) => {
            if(header){
              this.setForm(header)
            }
          })
        } else {
          this.filterForm = null;
        }
      }
    );
  }

  setForm(header: TableDefinitionModel) {
    this.filterForm = new FormGroup({
      'id': new FormControl(),
      'name': new FormControl(),
      'createdBy': new FormControl(),
      'createdOn': new FormControl(),
      'lastModifiedBy': new FormControl(),
      'lastModifiedOn': new FormControl(),
      'columnValueDtos': new FormArray([]),
      'taskDtos': new FormControl()
    });

    header[0].columnDetailDefinitionDtoList.forEach((cell, i) => {
      const columnName: string = 'columnValueDtos' + i;
      (<FormArray>this.filterForm.get('columnValueDtos')).push(new FormGroup({
        'value': new FormControl()
      }));
    })
  }

  onNewRow() {
    this.contentStore.dispatch(new TablesActions.SetEditRowMode(true));
  }

  getFormValues(): ExtendedFilterModel {
    return this.filterForm['value'];
  }

  onRunExtendedFilter() {
    this.contentStore.dispatch(new TablesActions.SetExtendedFilter(this.getFormValues()));
  }

  sort(payload: SortModel){
    this.contentStore.dispatch(new TablesActions.SetSortContent(payload));
  }
}
