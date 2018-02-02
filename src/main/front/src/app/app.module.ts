import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
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
import { tablesReducers } from './shared/store/table/tables.reducers';
import { usersReducers } from './shared/store/user/users.reducers';
import {KeyPipe} from './tables/key.pipe';
import {QuestionControlService} from './tables/row/question-control.service';
import {TableHeaderComponent} from './tables/table-header/table-header.component';
import {UserDetailsComponent} from './user/user-details/user-details.component';
import {RoleDetailsComponent} from './roles/role-details/role-details.component';
import {DataStorageService} from "./shared/data-storage.service";
import {MenuComponent} from './tables/menu/menu.component';
import {OauthService} from "./shared/oauth.service";
import {AuthInterceptor} from "./shared/auth.interceptor";
import {AuthCookie} from "./shared/auth-cookies-handler";
import { RowDetailsComponent } from './tables/row-details/row-details.component';
import {FilterService} from "./shared/filter.service";
import { TaskComponent } from './tables/task/task.component';
import {tasksReducers} from "./shared/store/task/tasks.reducers";
import {chatReducers} from "./shared/store/chat/chat.reducers";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {StoreDevtools, StoreDevtoolsModule} from "@ngrx/store-devtools";
import { environment } from '../environments/environment';
import {UserTaskComponent} from "./user/user-task/user-task.component";
import {TaskInfoService} from "./shared/socket/task-info.service";
import {WebSocketService} from "./shared/socket/web-socket.service";
import { ChatComponent } from './chat/chat.component';
import {StoreResetService} from "./shared/store-reset.service";
import {ReversePipe} from "./shared/reverse.pipe";
import {ExtendedFilterModel} from "./shared/table.model";
import {ExtendedFilterPipe} from "./shared/extended-filter.pipe";



const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'roles', component: RolesComponent},
  {path: 'users', component: UserComponent},
  {path: 'tables', component: TablesComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'definitions', component: DefinitionComponent},
  {path: 'chat', component: ChatComponent},
];

@NgModule({
  declarations: [
    AppComponent,
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
    TableHeaderComponent,
    UserDetailsComponent,
    RoleDetailsComponent,
    MenuComponent,
    RowDetailsComponent,
    TaskComponent,
    UserTaskComponent,
    ChatComponent,
    ExtendedFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({tables: tablesReducers, users: usersReducers, tasks: tasksReducers, chat: chatReducers}),
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
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
    ],
  exports: [
    ExtendedFilterPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
