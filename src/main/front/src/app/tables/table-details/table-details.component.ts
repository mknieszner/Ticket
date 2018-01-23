import {Component, OnDestroy, OnInit} from '@angular/core';
import {RowContentModel, TableDefinitionModel} from "../../shared/row.model";
import {Observable} from "rxjs/Observable";
import {DataStorageService} from "../../shared/data-storage.service";
import {Store} from "@ngrx/store";
import * as fromTableReducers from '../../shared/store/tables.reducers'
import * as TablesActions from "../../shared/store/tables.actions";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Question} from "../table/value-types/question-base.model";
import {QuestionControlService} from "../table/question-control.service";

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.css']
})
export class TableDetailsComponent implements OnInit, OnDestroy {
  row: Observable<RowContentModel>;
  header: Observable<TableDefinitionModel>;
  updateRowForm: FormGroup;
  newRowForm: FormGroup;
  editRowMode: Observable<boolean>;
  unlockFields: boolean;
  newRowMode: Observable<boolean>;

  constructor(private qcs: QuestionControlService,
              private store: Store<fromTableReducers.AppState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.unlockFields = false;
    this.editRowMode = this.store.select('tables', 'editRowMode');
    this.row = this.store.select('tables', 'editedRow');
    this.header = this.store.select('tables', 'tableDefinition');
    this.row.subscribe(row => {
      this.createUpdateRowForm(row)
    });
    this.newRowMode = this.store.select('tables', 'newRowMode');
    this.newRowMode.subscribe((action: boolean) => {
      this.createNewRowForm();
    })
  }

  createNewRowForm() {
    this.header.subscribe(header => {
      console.log(header);
      if (header) {
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

        header[0]['columnDetailDefinitionDtoList'].forEach((column) => {
          (<FormArray>this.newRowForm.get('columnValueDtos')).push(
            this.qcs.toFormGroup([new Question({key: column.type, value: ''})])
          );
        });
      }
    });
    console.log(this.newRowForm);
  }

  createUpdateRowForm(row) {
    console.log('UPDATE');
    console.log(row);
    if (row) {
      this.updateRowForm =
        new FormGroup({
          'id': new FormControl(row.id),
          'name': new FormControl(row.name),
          'createdBy': new FormControl(row.createdBy),
          'createdOn': new FormControl(row.createdOn),
          'lastModifiedBy': new FormControl(row.lastModifiedBy),
          'lastModifiedOn': new FormControl(row.lastModifiedOn),
          'columnValueDtos': new FormArray([])
        });

      row.columnValueDtos.forEach((cell) => {
        (<FormArray>this.updateRowForm.get('columnValueDtos')).push(
          this.qcs.toFormGroup([new Question({key: Object.keys(cell), value: cell[Object.keys(cell)[0]].value})])
        );
      });
    }
  }

  show() {
    this.row.subscribe(this.updateRowForm.value);
  }

  onToggleRowEditMode() { // TODO reset all details state
    this.store.dispatch(new TablesActions.SetEditRowMode(false));
    this.store.dispatch(new TablesActions.SetNewRowModeAction(false));
    this.unlockFields = false;
  }

  onSubmit() {
    if (this.unlockFields) {
      const mappedFormValue = mapForm(this.updateRowForm.value);
      this.header.forEach(header => {
        console.log(this.updateRowForm.value);
        this.dss.updateRow(header[0].name, this.updateRowForm.value);
      });
      this.onToggleRowEditMode();
    }

    this.newRowMode.forEach(condition => {
      if (condition) { //[0]???
        console.log(condition);
      }
    });

    function mapForm(formValue) {
      formValue.columnValueDtos.forEach((value, i) => {
        // console.log(Object.keys(value[Object.keys(value)[0]])[0]);
        if (Object.keys(value[Object.keys(value)[0]])[0] !== 'value') {
          let mappedcolumnValue = {};
          mappedcolumnValue[Object.keys(value)[0]] = {value: value[Object.keys(value)[0]]};
          formValue.columnValueDtos[i] = mappedcolumnValue;
        }
      });
      return formValue;
    }
  }

  onSaveNewRow() {
    let newRow = this.mapNewRow();
    // console.log(newRow);
    this.header.forEach(header => {
      // console.log('forEach', header);
      this.dss.addNewRow(header[0].name, newRow);
    });
  }

  mapNewRow() {
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

  toggleUnlock() {
    this.unlockFields = !this.unlockFields;
  }

  ngOnDestroy(): void {
  }
}
