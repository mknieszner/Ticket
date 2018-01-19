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
import {ColumnTypeComponent} from './definition/column-type/column-type.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableComponent} from './tables/table/table.component';
import {StoreModule} from '@ngrx/store';
import {tablesReducers} from './shared/store/tables.reducers';
import {KeyPipe} from './tables/key.pipe';
import {QuestionControlService} from './tables/table/question-control.service';
import {TableHeaderComponent} from './tables/table-header/table-header.component';
import {NewRowComponent} from './tables/new-row/new-row.component';
import {UserDetailsComponent} from './user/user-details/user-details.component';
import {userReducers} from './user/store/user.reducers';
import {RoleDetailsComponent} from './roles/role-details/role-details.component';
import {roleReducers} from './roles/store/role.reducers';
import {DataStorageService} from "./shared/data-storage.service";
import {MenuComponent} from './tables/menu/menu.component';
import {TableService} from "./tables/table/table.service";
import {OauthService} from "./shared/oauth.service";
import {AuthInterceptor} from "./shared/auth.interceptor";
import {OAuthModule} from "angular-oauth2-oidc";
import {AuthCookie} from "./shared/auth-cookies-handler";
import {AngularDateTimePickerModule} from "angular2-datetimepicker";



const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'roles', component: RolesComponent},
  {path: 'users', component: UserComponent},
  {path: 'tables', component: TablesComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'definitions', component: DefinitionComponent},
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
    TableComponent,
    HomeComponent,
    ColumnTypeComponent,
    KeyPipe,
    TableHeaderComponent,
    NewRowComponent,
    UserDetailsComponent,
    RoleDetailsComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({tables: tablesReducers, users: userReducers, roles: roleReducers})
  ],
  providers: [
    QuestionControlService,
    DataStorageService,
    TableService,
    OauthService,
    AuthCookie,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
