import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as TableActions from './tables.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Store} from "@ngrx/store";

@Injectable()
export class TableContentFilterEffects {
  // @Effect()
  // extendedFilter = this.actions$
  //   .ofType(TableActions.RUN_EXTENDED_FILTER)


  constructor(private actions$: Actions, ) {
  }
}
