import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {QuestionControlService} from './question-control.service';
import {ExtendedFilterModel, RowContentModel, TableDefinitionModel} from '../../shared/row.model';
import {Question} from './value-types/question-base.model';
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {DataStorageService} from "../../shared/data-storage.service";
import * as fromAppReducers from '../../shared/store/app.reducers'
import * as TablesActions from "../../shared/store/table/tables.actions";

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
              private dss: DataStorageService) {
    this.filter = this.store.select('tables', 'tableFilter');
  }

  ngOnInit() {
    this.initForm();
    // this.editMode = this.store.select('tables', 'editRowMode');
    this.filter.subscribe(filter => {
      if (filter !== '') {
        this.runFilterTable(filter);
      } else {
        this.rowFilterState = true;
      }
    });
    this.extendedFilterContent = this.store.select('tables', 'extendedFilterContent');
    this.extendedFilterContent.subscribe(extendedFilterContent => {
      if (extendedFilterContent !== null) {
        this.runExtendedFilterTable(extendedFilterContent);
        // console.log('extendedFilterContent !== null');
      } else {
        this.rowFilterState = true;
        // console.log('extendedFilterContent == null');
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
    console.log('onEditForm');
  }

  show(elem) {
    console.log("A");
    console.log(elem);
    console.log('b');
  }

  print(item) {
    console.log(item);
  }

  runExtendedFilterTable(filter: ExtendedFilterModel) {
    // console.log('filter', filter);

    let condition = true;
    if ((this.row.id.toString()).includes(filter.id)) {
      // console.log(this.row.id.toString(),filter.id,(this.row.id.toString()).includes(filter.id));
      condition = false;
    }
    if ((this.row.name || '').includes(filter.name)) {
      // console.log(this.row.name || '',filter.name,(this.row.name || '').includes(filter.name));
      condition = false;
    }
    if ((this.row.createdOn.toString()).includes(filter.createdOn)) {
      // console.log(this.row.createdOn.toString(),filter.createdOn,(this.row.createdOn.toString()).includes(filter.createdOn));
      condition = false;
    }
    if ((this.row.createdBy.toString()).includes(filter.createdBy)) {
      // console.log(this.row.createdOn.toString(),filter.createdOn,(this.row.createdOn.toString()).includes(filter.createdOn));
      condition = false;
    }
    if ((this.row.lastModifiedOn.toString()).includes(filter.lastModifiedOn)) {
      // console.log(this.row.lastModifiedOn.toString(),filter.lastModifiedOn,(this.row.lastModifiedOn.toString()).includes(filter.lastModifiedOn));
      condition = false;
    }
    if ((this.row.lastModifiedBy.toString()).includes(filter.lastModifiedBy)) {
      // console.log(this.row.lastModifiedBy.toString(),filter.lastModifiedBy,(this.row.lastModifiedBy.toString()).includes(filter.lastModifiedBy));
      condition = false;
    }
    this.row.columnValueDtos.forEach((value, i) => {
      if (((this.getMappedValue(value)).includes(filter.columnValueDtos[i].value))) {
        // console.log(this.getMappedValue(value),filter.columnValueDtos[i].value,(this.getMappedValue(value)).includes(filter.columnValueDtos[i].value));
        condition = false;
      }
    });
    // console.log(filter, this.row, condition)
    this.rowFilterState = !condition;
  }

  runFilterTable(filter: string) {
    let condition = false;
    this.row.columnValueDtos.forEach(value => {
      if (((this.getMappedValue(value)).includes(filter))) {
        condition = true;
      }
    });
    this.rowFilterState = condition;
  }

  getMappedValue(object): string {
    return object[Object.keys(object)[0]].value.toString();
  }
}
