import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {SigninComponent} from './signin/signin.component';
import {DefinitionComponent} from './definition/definition.component';
import {UserComponent} from './user/user.component';
import {RolesComponent} from './roles/roles.component';
import {TablesComponent} from './tables/tables.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RowComponent} from './tables/row/row.component';
import {StoreModule} from '@ngrx/store';
import {KeyPipe} from './tables/key.pipe';
import {QuestionControlService} from './tables/row/question-control.service';
import {TableHeaderComponent} from './tables/table-header/table-header.component';
import {UserDetailsComponent} from './user/user-details/user-details.component';
import {RoleDetailsComponent} from './roles/role-details/role-details.component';
import {DataStorageService} from './shared/data-storage.service';
import {MenuComponent} from './tables/menu/menu.component';
import {OauthService} from './shared/oauth.service';
import {AuthInterceptor} from './shared/auth.interceptor';
import {AuthCookie} from './shared/auth-cookies-handler';
import {RowDetailsComponent} from './tables/row-details/row-details.component';
import {FilterService} from './shared/filter/filter.service';
import {TaskComponent} from './tables/task/task.component';

import {tablesReducers} from './shared/store/table/tables.reducers';
import {usersReducers} from './shared/store/user/users.reducers';
import {tasksReducers} from './shared/store/task/tasks.reducers';
import {chatReducers} from './shared/store/chat/chat.reducers';
import {statisticsReducers} from './shared/store/statistics/statistics.reducers';

import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {UserTaskComponent} from './user/user-task/user-task.component';
import {TaskInfoService} from './shared/socket/task-info.service';
import {WebSocketService} from './shared/socket/web-socket.service';
import {ChatComponent} from './chat/chat.component';
import {StoreResetService} from './shared/store-reset.service';
import {ReversePipe} from './shared/reverse.pipe';
import {ExtendedFilterPipe} from './shared/filter/extended-filter.pipe';
import {SortByPipe} from './shared/sort/sort-by.pipe';
import {StatisticsComponent} from './statistics/statistics.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {StatisticsService} from './shared/statistics/statistics.service';
import {ChartsModule} from 'ng4-charts';
import {ClearArrayPipe} from './shared/clear-array-pipe';
import {SpinnerComponent} from './spinner/spinner.component';
import {TableStatisticsComponent} from "./statistics/table-stats/table-statistics.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppMaterialModule} from "./shared/modules/material/app-material.module";
import {TrainingComponent} from './training/training.component';
import {AppRoutingModule} from "./shared/modules/routing/app-routing-module";
import {FlexLayoutModule} from "@angular/flex-layout";
import { DialogComponent } from './training/dialog/dialog.component';
import { TableComponent } from './training/table/table.component';
import {OverlayContainer} from "@angular/cdk/overlay";
import {SnackBarComponent} from "./training/snack-bar/snack-bar.component";
import {ConstantsService} from "./shared/constants.service";

@NgModule({
  declarations: [
    AppComponent,
    TableStatisticsComponent,
    HeaderComponent,
    SigninComponent,
    DefinitionComponent,
    UserComponent,
    RolesComponent,
    TablesComponent,
    RowComponent,
    HomeComponent,
    KeyPipe,
    ReversePipe,
    ClearArrayPipe,
    TableHeaderComponent,
    UserDetailsComponent,
    RoleDetailsComponent,
    MenuComponent,
    RowDetailsComponent,
    TaskComponent,
    UserTaskComponent,
    ChatComponent,
    ExtendedFilterPipe,
    SortByPipe,
    StatisticsComponent,
    UserInfoComponent,
    SpinnerComponent,
    TrainingComponent,
    DialogComponent,
    TableComponent,
    SnackBarComponent
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppMaterialModule,
    AppRoutingModule,
    StoreModule.forRoot({
      tables: tablesReducers,
      users: usersReducers,
      tasks: tasksReducers,
      chat: chatReducers,
      statistics: statisticsReducers
    }),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    QuestionControlService,
    DataStorageService,
    FilterService,
    OauthService,
    AuthCookie,
    TaskInfoService,
    WebSocketService,
    StoreResetService,
    StatisticsService,
    ConstantsService,
    Location,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
  ],
  exports: [
    ExtendedFilterPipe,
    SortByPipe
  ],
  entryComponents: [DialogComponent, SnackBarComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('candy-themed');
    overlayContainer.getContainerElement().classList.add('my-themed');
  }
}

