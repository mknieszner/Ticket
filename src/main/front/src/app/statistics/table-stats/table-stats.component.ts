import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";

import * as fromAppReducers from '../../shared/store/app.reducers';
import {TableState} from "../../shared/store/table/tables.reducers";
import {TaskModel} from "../../shared/table.model";
import {DataStorageService} from "../../shared/data-storage.service";
import {EnumInfoModel, TableInfoModel} from "../../shared/statistics/table-info.model";
import {StatisticsService} from "../../shared/statistics/statistics.service";
import {TasksInfoModel} from "../../shared/statistics/tasks-info.model";


@Component({
  selector: 'app-table-stats',
  templateUrl: './table-stats.component.html',
  styleUrls: ['./table-stats.component.css']
})
export class TableStatsComponent implements OnInit {

  tableState: Observable<TableState>;
  selectedTableName: Observable<string>;
  tableInfo: TableInfoModel = null;
  tasksInfo: TasksInfoModel = null;
  enumChartData: { data: any[], label: string }[] = [];
  enumChartLabels: any[] = [];
  barChartType:string = 'doughnut';
  enumChartLegend:boolean = true;
  barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };


  constructor(private store: Store<fromAppReducers.AppState>,
              private dss: DataStorageService,
              private statistics: StatisticsService) {
  }

  ngOnInit() {
    this.tableState = this.store.select('tables');
    this.selectedTableName = this.store.select('statistics', 'selectedTableName');
    this.selectedTableName.subscribe((tableName: string) => {
      this.dss.getTableRowsByName(tableName);
    });
    this.tableState.subscribe((tableState: TableState) => {
      if (tableState) {
        this.tasksInfo = this.statistics.mapToTaskInfo(tableState.tableContent);
        this.tableInfo = this.statistics.mapToRowsInfo(tableState.tableContent);
        this.tableInfo.columnInfo.enumInfo.forEach((enumInfo: EnumInfoModel[],i) => {
          this.enumChartData = [];
          this.enumChartLabels = [];
          let enumValues = [];
          let columnNumber = null;
          enumInfo.forEach((enumInfo: EnumInfoModel) => {
            enumValues.push(enumInfo.sum);
            columnNumber = enumInfo.columnNumber;
            this.enumChartLabels.push(enumInfo.name);
          });
          this.enumChartData.push({data: enumValues,label: 'ENUM' + columnNumber})

        });
      }
    })
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}

