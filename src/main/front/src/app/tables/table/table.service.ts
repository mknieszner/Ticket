import {Subject} from "rxjs/Subject";
import {RowContentModel} from "../../shared/row.model";

export class TableService {
  rowsChanged = new Subject<RowContentModel[]>();

  private rows: RowContentModel[] = [];

  constructor() {
  }

  setRows(rows: RowContentModel[]) {
    this.rows = rows;
    this.rowsChanged.next(this.rows.slice());
  }

  getRows() {
//TODO: STWORZYć metode w httpClient jeżeli status Ok to {
    return this.rows.slice();
  }

  addRow(row: RowContentModel) {
    //TODO: STWORZYć metode w httpClient jeżeli status Ok to {
    this.rows.push(row);
    this.rowsChanged.next(this.rows.slice());
    // }
  }

  updateRow(row: RowContentModel) {
    //TODO: STWORZYć metode w httpClient jeżeli status Ok to {
    this.rows[row.id] = row;
    this.rowsChanged.next(this.rows.slice());
    // }
  }

  deleteRow(row: RowContentModel) {
    //TODO: STWORZYć metode w httpClient jeżeli status Ok to {
    this.rows.splice(row.id);
    this.rowsChanged.next(this.rows.slice());
    // }
  }
}
