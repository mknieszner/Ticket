import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import * as fromAppReducers from '../../shared/store/app.reducers';
import {TableState} from '../../shared/store/table/tables.reducers';
import {TableDefinitionModel} from '../../shared/table.model';
import {DataStorageService} from '../../shared/data-storage.service';
import {EnumInfoModel, TableInfoModel} from '../../shared/statistics/table-info.model';
import {StatisticsService} from '../../shared/statistics/statistics.service';
import {TasksInfoModel} from '../../shared/statistics/tasks-info.model';
import {EnumChart} from './charts.model';


@Component({
  selector: 'app-table-stats',
  templateUrl: './table-stats.component.html',
  styleUrls: ['./table-stats.component.css']
})
export class TableStatsComponent implements OnInit {
  tableHeaderState: Observable<TableDefinitionModel>;
  tableState: Observable<TableState>;
  selectedTableName: Observable<string>;
  tableInfo: TableInfoModel = null;
  tasksInfo: TasksInfoModel = null;
  enumCharts: EnumChart[] = [];

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
      if (tableName) {
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
          console.log('enumCharts', this.enumCharts);
          this.setEnumChart(enumInfo, i);
        });
      }
    });
  }

  static show(array) {
    console.log(array);
  }

  setEnumChart(enumInfos: EnumInfoModel[], i: number) {
    this.enumCharts[i] = {
      data: [],
      labels: [],
      chartType: (i % 2 === 0) ? 'doughnut' : 'bar',
      legend: true,
      options: {
        scaleShowVerticalLines: false,
        responsive: true,
        legend: false,
        elements: {
          arc: {
            borderWidth: 0
          }
        }
      }
    };
    const  enumValues = [];
    let columnNumber = null;
    enumInfos.forEach((enumInfo: EnumInfoModel) => {
      enumValues.push(enumInfo.sum);
      columnNumber = enumInfo.columnNumber;
      this.enumCharts[i].labels.push(enumInfo.name);
    });
    this.enumCharts[i].data.push({data: enumValues, label: 'ENUM ' + columnNumber});
  }
}

