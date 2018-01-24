import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import * as fromDefinitionModel from '../shared/row.model';
import {DataStorageService} from "../shared/data-storage.service";


@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.css']
})
export class DefinitionComponent implements OnInit {
  definitionForm: FormGroup;
  options = fromDefinitionModel.options;


  constructor(private dss: DataStorageService) {
  }

  ngOnInit() {
    this.initForm();
    // this.options = fromDefinitionModel.options;
  }

  private initForm() {

    this.definitionForm = new FormGroup({
      'name': new FormControl(),
      'columnDetailDefinitionDtoList': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.definitionForm.value);
  }

  onAddColumn() {
    (<FormArray>this.definitionForm.get('columnDetailDefinitionDtoList')).push(
      new FormGroup({
        'type': new FormControl('IN'),
        'name': new FormControl(''),
        'optionList': new FormArray([])
      })
    );
  }

  onAddOptions(i: number) {
    (<FormArray>(<FormArray>this.definitionForm.get('columnDetailDefinitionDtoList')).at(i).get('optionList')).push(
      new FormControl()
    );
  }

  onDeleteOption(typeIndex: number, optionNumber: number) {
    (<FormArray>(<FormArray>this.definitionForm.get('columnDetailDefinitionDtoList')).at(typeIndex).get('optionList')).removeAt(optionNumber);
  }

  onDeleteColumn(i) {
    (<FormArray>this.definitionForm.get('columnDetailDefinitionDtoList')).removeAt(i);
  }

  onResetForm() {
    this.initForm();
  }

  postForm() {
    let formValue = this.definitionForm.value
    formValue['id'] = null;
    this.dss.postTableDefinition(formValue);
  }
}
