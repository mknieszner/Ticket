import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {QuestionControlService} from './question-control.service';
import {RowContentModel, TableDefinitionModel} from '../../shared/row.model';
import {Question} from './value-types/question-base.model';
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import * as fromTableReducer from '../../shared/store/tables.reducers';
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() row: RowContentModel;
  @Input() header: TableDefinitionModel;
  rowForm: FormGroup;
  editMode = false;
  newRowMode = false;
  tableName:string;


  constructor(private qcs: QuestionControlService,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.initForm();
  }

  onNewRow() {
    this.newRowMode = true;
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
        this.qcs.toFormGroup([new Question({key: Object.keys(cell), value: cell[Object.keys(cell)[0]].value})])
      );
    });
  }

  onSubmit() {
    const mappedFormValue = mapForm(this.rowForm.value);
    this.dss.updateRow(this.header[0].name,this.rowForm.value);
    this.onEditForm();
    function mapForm(formValue) {
      formValue.columnValueDtos.forEach((value,i) => {
        // console.log(Object.keys(value[Object.keys(value)[0]])[0]);
        if(Object.keys(value[Object.keys(value)[0]])[0] !== 'value') {
          let mappedcolumnValue={};
          mappedcolumnValue[Object.keys(value)[0]] = {value: value[Object.keys(value)[0]]};
          formValue.columnValueDtos[i] = mappedcolumnValue;
        }
      });
      return formValue;
    }
  }

  onEditForm() {
    this.editMode = !this.editMode;
  }

  show(elem){

    console.log("A");
    console.log(elem);
    console.log('b');
  }

  print(item) {
    console.log(item);
  }
}
