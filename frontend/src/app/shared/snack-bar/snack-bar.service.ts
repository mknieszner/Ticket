import {Injectable} from "@angular/core";
import {InfoSnackBarComponent} from "./info-snack-bar.component";
import {MatSnackBar, MatSnackBarRef} from "@angular/material";

export enum SnackBarTheme {
  danger = 'danger',
  info = 'info',
  primary = 'primary',
  success = 'success',
}
@Injectable()
export class SnackBarService {
  snackBarRef: MatSnackBarRef<InfoSnackBarComponent>;

  constructor(public snackBar: MatSnackBar) {
  }

  public showSnackBar(message: string, color: SnackBarTheme = SnackBarTheme.danger): void {
    this.snackBarRef = this.snackBar.openFromComponent(InfoSnackBarComponent, {
      panelClass: [color],
      data: {
        message: message,
        className: color
      }
    });
    this.snackBarRef.instance.ref = this.snackBarRef;
  }
}
