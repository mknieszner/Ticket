import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";

import * as fromAppReducers from '../../shared/store/app.reducers';
import {TableState} from "../../shared/store/table/tables.reducers";
import {TableDefinitionModel, TaskModel} from "../../shared/table.model";
import {DataStorageService} from "../../shared/data-storage.service";
import {EnumInfoModel, TableInfoModel} from "../../shared/statistics/table-info.model";
import {StatisticsService} from "../../shared/statistics/statistics.service";
import {TasksInfoModel} from "../../shared/statistics/tasks-info.model";
import {EnumChart} from "./charts.model";


@Component({
  selector: 'app-table-stats',
  templateUrl: './table-stats.component.html',
  styleUrls: ['./table-stats.component.css']
})
export class TableStatsComponent implements OnInit {
  tableHeaderState: Observable<TableDefinitionModel>
  tableState: Observable<TableState>;
  selectedTableName: Observable<string>;
  tableInfo: TableInfoModel = null;
  tasksInfo: TasksInfoModel = null;
  enumChart: EnumChart = {
    data: [],
    labels: [],
    chartType: 'doughnut',
    legend: true,
    options: {
      scaleShowVerticalLines: false,
      responsive: true
    }
  };

  constructor(private store: Store<fromAppReducers.AppState>,
              private dss: DataStorageService,
              private statistics: StatisticsService) {
  }

  ngOnInit() {
    this.tableHeaderState = this.store.select('tables', 'tableDefinition');
    this.tableHeaderState.subscribe((header: TableDefinitionModel) => {
      console.log(header);
    });
    this.tableState = this.store.select('tables');
    this.selectedTableName = this.store.select('statistics', 'selectedTableName');
    this.selectedTableName.subscribe((tableName: string) => {
      if(tableName) {
        this.dss.getTableRowsByName(tableName);
        this.dss.getTableHeaderByName(tableName);
      }
    });
    this.tableState.subscribe((tableState: TableState) => {
      if (tableState) {
        this.tasksInfo = this.statistics.mapToTaskInfo(tableState.tableContent);
        this.tableInfo = this.statistics.mapToRowsInfo(tableState.tableContent);
        console.log(this.tableInfo);
        this.tableInfo.columnInfo.enumInfo.forEach((enumInfo: EnumInfoModel[], i) => {
          this.setEnumChart(enumInfo);
      });
      }
    })
  }

  setEnumChart(enumInfo: EnumInfoModel[]){
    this.enumChart.data = [];
    this.enumChart.labels = [];
    let enumValues = [];
    let columnNumber = null;
    enumInfo.forEach((enumInfo: EnumInfoModel) => {
      enumValues.push(enumInfo.sum);
      columnNumber = enumInfo.columnNumber;
      this.enumChart.labels.push(enumInfo.name);
    });
    this.enumChart.data.push({data: enumValues, label: 'ENUM' + columnNumber})
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}

