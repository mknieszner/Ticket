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
import {RowComponent} from './tables/table/row.component';
import {StoreModule} from '@ngrx/store';
import {tablesReducers} from './shared/store/tables.reducers';
import {KeyPipe} from './tables/key.pipe';
import {QuestionControlService} from './tables/table/question-control.service';
import {TableHeaderComponent} from './tables/table-header/table-header.component';
import {UserDetailsComponent} from './user/user-details/user-details.component';
import {RoleDetailsComponent} from './roles/role-details/role-details.component';
import {DataStorageService} from "./shared/data-storage.service";
import {MenuComponent} from './tables/menu/menu.component';
import {OauthService} from "./shared/oauth.service";
import {AuthInterceptor} from "./shared/auth.interceptor";
import {OAuthModule} from "angular-oauth2-oidc";
import {AuthCookie} from "./shared/auth-cookies-handler";
import { TableDetailsComponent } from './tables/table-details/table-details.component';
import {EffectsModule} from "@ngrx/effects";
import {TableContentFilterEffects} from "./shared/store/table-content-filter.effects";



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
    RowComponent,
    HomeComponent,
    ColumnTypeComponent,
    KeyPipe,
    TableHeaderComponent,
    UserDetailsComponent,
    RoleDetailsComponent,
    MenuComponent,
    TableDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({tables: tablesReducers}),// users: userReducers, roles: roleReducers}),//todo: rozdzielić store
    EffectsModule.forRoot([TableContentFilterEffects])
  ],
  providers: [
    QuestionControlService,
    DataStorageService,
    OauthService,
    AuthCookie,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
