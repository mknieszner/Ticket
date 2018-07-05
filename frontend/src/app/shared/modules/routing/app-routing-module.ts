import {NgModule} from "@angular/core";
import {UserComponent} from "../../../user/user.component";
import {ChatComponent} from "../../../chat/chat.component";
import {TrainingComponent} from "../../../training/training.component";
import {SigninComponent} from "../../../signin/signin.component";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../../../home/home.component";
import {StatisticsComponent} from "../../../statistics/statistics.component";
import {RolesComponent} from "../../../roles/roles.component";
import {TablesComponent} from "../../../tables/tables.component";
import {DefinitionComponent} from "../../../definition/definition.component";
import {UserInfoComponent} from "../../../user-info/user-info.component";

export const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'roles', component: RolesComponent},
  {path: 'users', component: UserComponent},
  {path: 'tables', component: TablesComponent},
  {path: 'signin', component: SigninComponent},
  // {path: 'signin', component: TrainingComponent},
  {path: 'definitions', component: DefinitionComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'user-info', component: UserInfoComponent},
  {path: 'user-info', component: UserInfoComponent},
  {path: 'training', component: TrainingComponent},
];

@NgModule({
imports: [RouterModule.forRoot(appRoutes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
