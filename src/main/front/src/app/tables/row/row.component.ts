import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {QuestionControlService} from './question-control.service';
import {ExtendedFilterModel, RowContentModel, TableDefinitionModel} from '../../shared/table.model';
import {Question} from './value-types/question-base.model';
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {DataStorageService} from "../../shared/data-storage.service";
import * as fromAppReducers from '../../shared/store/app.reducers'
import * as TablesActions from "../../shared/store/table/tables.actions";
import {FilterService} from "./filter.service";

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {
  @Input() row: RowContentModel;
  @Input() header: TableDefinitionModel;
  rowForm: FormGroup;
  // editMode: Observable<boolean>;
  filter: Observable<string>;
  rowFilterState: boolean = true;
  extendedFilterContent: Observable<ExtendedFilterModel>;


  constructor(private qcs: QuestionControlService,
              private store: Store<fromAppReducers.AppState>,
              private dss: DataStorageService,
              private filterService: FilterService) {
    this.filter = this.store.select('tables', 'tableFilter');
  }

  ngOnInit() {
    this.initForm();
    // this.editMode = this.store.select('tables', 'editRowMode');
    this.filter.subscribe(filter => {
      if (filter !== '') {
        this.rowFilterState = this.filterService.runFilterTable(this.row, filter);
      } else {
        this.rowFilterState = true;
      }
    });
    this.extendedFilterContent = this.store.select('tables', 'extendedFilterContent');
    this.extendedFilterContent.subscribe(extendedFilterContent => {
      if (extendedFilterContent !== null) {
        this.rowFilterState = this.filterService.runExtendedFilterTable(this.row,extendedFilterContent);
      } else {
        this.rowFilterState = true;
      }
    });
  }


  private initForm() {
    this.rowForm =
      new FormGroup({
        'id': new FormControl(this.row.id),
        'name': new FormControl(this.row.name),
        'createdBy': new FormControl(this.row.createdBy),
        'createdOn': new FormControl(this.row.createdOn),
        'lastModifiedBy': new FormControl(this.row.lastModifiedBy),
        'lastModifiedOn': new FormControl(this.row.lastModifiedOn),
        'columnValueDtos': new FormArray([])
      });

    this.row.columnValueDtos.forEach((cell) => {
      (<FormArray>this.rowForm.get('columnValueDtos')).push(
        this.qcs.toFormGroup([new Question({key: Object.keys(cell), value: this.getMappedValue(cell)})])
      );
    });
  }

  onEditForm() {
    this.store.dispatch(new TablesActions.SetNewRowModeAction(false));
    this.store.dispatch(new TablesActions.SetEditRowMode(true));
    this.store.dispatch(new TablesActions.SetEditedRow(this.row));
  }

  getMappedValue(object): string {
    return object[Object.keys(object)[0]].value.toString();
  }
}
