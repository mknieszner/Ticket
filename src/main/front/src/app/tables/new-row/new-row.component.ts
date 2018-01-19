import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RowContentModel, TableDefinitionModel} from '../../shared/row.model';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Question} from '../table/value-types/question-base.model';
import {QuestionControlService} from '../table/question-control.service';
import * as TablesActions from '../../shared/store/tables.actions';
import {Store} from '@ngrx/store';
import * as fromTableReducers from '../../shared/store/tables.reducers';
import {Observable} from "rxjs/Observable";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-new-row',
  templateUrl: './new-row.component.html',
  styleUrls: ['./new-row.component.css']
})
export class NewRowComponent implements OnInit {
  @Input() header: TableDefinitionModel;
  newRowForm: FormGroup;
  newRowMode:Observable<boolean>;

  constructor(private qcs: QuestionControlService,
              private contentStore: Store<fromTableReducers.AppState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.newRowMode = this.contentStore.select('tables','newRowMode');
    this.initForm();
  }

  private initForm() {
    this.newRowForm =
      new FormGroup({
        'id': new FormControl(),
        'name': new FormControl(),
        'createdBy': new FormControl(),
        'createdOn': new FormControl(),
        'lastModifiedBy': new FormControl(),
        'lastModifiedOn': new FormControl(),
        'columnValueDtos': new FormArray([])
      });

    this.header[0].columnDetailDefinitionDtoList.forEach((column) => {
      (<FormArray>this.newRowForm.get('columnValueDtos')).push(
        this.qcs.toFormGroup([new Question({key: column.type, value: ''})])
      );
    });
  }

  onSaveNewRow() {
    let newRow = this.mapNewRow();
    console.log(newRow);
    console.log(this.header[0].name);
     this.dss.addNewRow(this.header[0].name, newRow);
    // this.contentStore.dispatch(new TablesActions.AddRowAction(newRow));
  }

  onAbortNewRow() {
    this.newRowMode.subscribe(console.log);
    this.contentStore.dispatch(new TablesActions.SetNewRowModeAction(false));
  }

  mapNewRow(){
    let newRow = this.newRowForm.value;
    let mapedNewRow = {
      id: this.newRowForm.value.id,
      name: this.newRowForm.value.name,
      createdBy: this.newRowForm.value.createdBy,
      createdOn: this.newRowForm.value.createdOn,
      lastModifiedBy: this.newRowForm.value.lastModifiedBy,
      lastModifiedOn: this.newRowForm.value.lastModifiedOn,
      columnValueDtos: []
    };

    newRow.columnValueDtos.forEach(value => {
      const newValue = {};
      newValue[Object.keys(value)[0]] = {value: value[Object.keys(value)[0]]};
      mapedNewRow.columnValueDtos.push(newValue);
    });
    return mapedNewRow;
  }
}
