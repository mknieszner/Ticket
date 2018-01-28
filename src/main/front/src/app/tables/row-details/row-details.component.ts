import {Component, OnDestroy, OnInit} from '@angular/core';
import {RowContentModel, TableDefinitionModel, TaskModel} from "../../shared/table.model";
import {Observable} from "rxjs/Observable";
import {DataStorageService} from "../../shared/data-storage.service";
import {Store} from "@ngrx/store";
import * as fromAppReducers from '../../shared/store/app.reducers'
import * as TablesActions from "../../shared/store/table/tables.actions";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Question} from "../row/value-types/question-base.model";
import {QuestionControlService} from "../row/question-control.service";
import {Task} from "protractor/built/taskScheduler";
import * as TaskActions from "../../shared/store/task/tasks.actions";

@Component({
  selector: 'app-row-details',
  templateUrl: './row-details.component.html',
  styleUrls: ['./row-details.component.css']
})
export class RowDetailsComponent implements OnInit, OnDestroy {
  row: Observable<RowContentModel>;
  header: Observable<TableDefinitionModel>;
  updateRowForm: FormGroup;
  newRowForm: FormGroup;
  editRowMode: Observable<boolean>;
  unlockFields: boolean;
  newRowMode: Observable<boolean>;
  selectedTask: TaskModel = null;
  selesctedRow: RowContentModel;

  constructor(private qcs: QuestionControlService,
              private store: Store<fromAppReducers.AppState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.unlockFields = false;
    this.editRowMode = this.store.select('tables', 'editRowMode');
    this.row = this.store.select('tables', 'editedRow');
    this.header = this.store.select('tables', 'tableDefinition');
    this.row.subscribe(row => {
      this.createUpdateRowForm(row)
      this.selesctedRow = row;
    });
    this.newRowMode = this.store.select('tables', 'newRowMode');
    this.newRowMode.subscribe((action: boolean) => {
      this.createNewRowForm();
    })
  }

  createNewRowForm() {
    this.header.subscribe(header => {
      if (header) {
        this.newRowForm =
          new FormGroup({
            'id': new FormControl(),
            'name': new FormControl(),
            'createdBy': new FormControl(),
            'createdOn': new FormControl(),
            'lastModifiedBy': new FormControl(),
            'lastModifiedOn': new FormControl(),
            'columnValueDtos': new FormArray([]),
            'taskDtos': new FormArray([])
          });

        header[0]['columnDetailDefinitionDtoList'].forEach((column) => {
          (<FormArray>this.newRowForm.get('columnValueDtos')).push(
            this.qcs.toFormGroup([new Question({key: column.type, value: ''})])
          );
        });
      }
    });
  }

  createUpdateRowForm(row) {

    if (row) {
      this.updateRowForm =
        new FormGroup({
          'id': new FormControl(row.id),
          'name': new FormControl(row.name),
          'createdBy': new FormControl(row.createdBy),
          'createdOn': new FormControl(row.createdOn),
          'lastModifiedBy': new FormControl(row.lastModifiedBy),
          'lastModifiedOn': new FormControl(row.lastModifiedOn),
          'columnValueDtos': new FormArray([]),
          'taskDtos': new FormArray([])
        });

      row.columnValueDtos.forEach((cell) => {
        (<FormArray>this.updateRowForm.get('columnValueDtos')).push(
          this.qcs.toFormGroup([new Question({key: Object.keys(cell), value: cell[Object.keys(cell)[0]].value})])
        );
      });
      row.taskDtos.forEach((task) => {
        (<FormArray>this.updateRowForm.get('taskDtos')).push(
          new FormGroup({
            'id': new FormControl(),
            'name': new FormControl(),
            'description': new FormControl(),
            'status': new FormControl(),
            'userNames': new FormArray([]),
            'taskDtos': new FormArray([])
          })
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
        this.dss.updateRow(header[0].name, this.updateRowForm.value);
      });
      this.onToggleRowEditMode();
    }

    function mapForm(formValue) {
      formValue.columnValueDtos.forEach((value, i) => {
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
    this.header.forEach(header => {
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
      columnValueDtos: [],
      taskDtos: []
    };

    newRow.columnValueDtos.forEach(value => {
      const newValue = {};
      newValue[Object.keys(value)[0]] = {value: value[Object.keys(value)[0]]};
      mapedNewRow.columnValueDtos.push(newValue);
    });

    console.log(mapedNewRow);
    return mapedNewRow;
  }

  toggleUnlock() {
    this.unlockFields = !this.unlockFields;
  }

  ngOnDestroy(): void {
  }

  onAddTask() {
    this.store.dispatch(new TaskActions.SetTaskDetailsModeAction(true));
    this.store.dispatch(new TaskActions.SetShowedTaskAction(null));
  }

  onShowTask(task: TaskModel) {
    this.selectedTask = task;
  }

  onShowTaskDetails(task: TaskModel) {
    this.store.dispatch(new TaskActions.SetTaskDetailsModeAction(true));
    this.store.dispatch(new TaskActions.SetShowedTaskAction(task));
  }

  onDeleteTask(taskId: number) {
    console.log('onDeleteTask', taskId, this.selesctedRow.id)
    this.dss.deleteTask(taskId, this.selesctedRow.id);
  }
}
