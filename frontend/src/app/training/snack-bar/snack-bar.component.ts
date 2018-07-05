import {Component, EmbeddedViewRef, Inject} from "@angular/core";
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material";

@Component({
  selector: 'app-snack-bar',
  template: `
    <section class="form"
             fxLayout
             fxLayoutAlign="center">
      <mat-card fxFlex.xs="100%" fxFlex="100%">
        <mat-card-title fxLayoutAlign="center">{{message || 'What!!!'}}</mat-card-title>
        <mat-card-content fxLayoutAlign="center">
          <button mat-button color="primary" (click)="dismiss()">{{action || 'Dismiss'}}</button>
          <button mat-button color="primary" (click)="dismissWithAction()">{{action || 'Dismiss '}} with action</button>
        </mat-card-content>
      </mat-card>
    </section>
  `,
  styles: [`
    ::ng-deep .styled-snack {
      padding: 0;
      margin: 0;
    }
  `],
})
export class SnackBarComponent {
  public ref: MatSnackBarRef<SnackBarComponent>;
  message: string;
  action: string;


  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string, action: string }) {
    this.message = data.message;
    this.action = data.action;
  }

  dismiss() {

    this.ref.dismiss();
  }

  dismissWithAction() {
    this.ref.dismissWithAction();
  }
}
