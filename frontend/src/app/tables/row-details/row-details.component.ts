import {Component, OnDestroy, OnInit} from '@angular/core';
import {RowContentModel, TableDefinitionModel, TablesDetails, TaskModel} from '../../shared/table.model';
import {Observable} from 'rxjs/Observable';
import {DataStorageService} from '../../shared/data-storage.service';
import {Store} from '@ngrx/store';
import * as fromAppReducers from '../../shared/store/app.reducers';
import * as TablesActions from '../../shared/store/table/tables.actions';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Question} from '../row/value-types/question-base.model';
import {QuestionControlService} from '../row/question-control.service';
import * as TaskActions from '../../shared/store/task/tasks.actions';

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
  selectedRow: RowContentModel;
  extendedRowView: Observable<boolean>;
  extendedRowViewValue: boolean;
  tablesDetails: TablesDetails[];
  private tableDefinition: TableDefinitionModel;

  constructor(private qcs: QuestionControlService,
              private store: Store<fromAppReducers.AppState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.unlockFields = false;
    this.extendedRowView = this.store.select('tables', 'extendedRowView');
    this.extendedRowView.subscribe((value: boolean) => {
      this.extendedRowViewValue = value;
    });
    this.editRowMode = this.store.select('tables', 'editRowMode');
    this.row = this.store.select('tables', 'editedRow');
    this.header = this.store.select('tables', 'tableDefinition');
    this.header.subscribe((header: TableDefinitionModel) => {
      this.tableDefinition = header[0];
    });
    this.row.subscribe(row => {
      this.createUpdateRowForm(row);
      this.selectedRow = row;
    });
    this.newRowMode = this.store.select('tables', 'newRowMode');
    this.newRowMode.subscribe(() => {
      this.createNewRowForm();
    });
    this.store.select('tables', 'tablesDetails').subscribe((tablesDetails: TablesDetails[]) => {
      this.tablesDetails = tablesDetails;
    });
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
      row.taskDtos.forEach(() => {
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

  // show() { TODO remove
  //   this.row.subscribe(this.updateRowForm.value);
  // }

  onToggleRowEditMode() { // TODO reset all details state
    this.store.dispatch(new TablesActions.SetEditRowMode(false));
    this.store.dispatch(new TablesActions.SetNewRowModeAction(false));
    this.store.dispatch(new TaskActions.SetTaskDetailsModeAction(false));
    this.store.dispatch(new TaskActions.SetShowedTaskAction(null));

    this.unlockFields = false;
  }

  onSubmit() {
    if (this.unlockFields) {
      this.header.forEach(header => {
        this.dss.updateRow(header[0].id, mapForm(this.updateRowForm.value));
      });
      this.onToggleRowEditMode();
    }

    function mapForm(formValue) { //TODO remove?
      formValue.columnValueDtos.forEach((value, i) => {
        if (Object.keys(value[Object.keys(value)[0]])[0] !== 'value') {
          const mappedColumnValue = {};
          mappedColumnValue[Object.keys(value)[0]] = {value: value[Object.keys(value)[0]]};
          formValue.columnValueDtos[i] = mappedColumnValue;
        }
      });
      return formValue;
    }
  }

  onSaveNewRow() {
    const newRow = this.mapNewRow();
    this.header.forEach(header => {
      this.dss.addNewRow(header[0].id, newRow);
    });
  }

  mapNewRow() {
    const newRow = this.newRowForm.value;
    const mapedNewRow = {
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

  onDeleteRow() {
    this.dss.deleteRow(this.tableDefinition.id, this.selectedRow.id);
  }

  onDeleteTask(taskId: number) {
    this.dss.deleteTask(this.tableDefinition.id, taskId, this.selectedRow.id);
  }

  switchExtendedRowView() {
    this.store.dispatch(new TablesActions.SetExtendedRowView(!this.extendedRowViewValue));
  }

  private getTableId(tableName: string): number {
    return this.tablesDetails.find((tableDetails) => tableDetails.name === tableName).id
  }
}
