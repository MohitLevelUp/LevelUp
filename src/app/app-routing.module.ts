import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UserListComponent } from './user/user-list.component';
import { SecurityComponent } from './security/security.component';
import { StatsComponent } from './stats/stats.component';
import { CoreValueComponent } from './core-value/core-value.component';
import { CorevaluesComponent } from './admin/corevalues/corevalues.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { GoalsComponent } from './admin/goals/goals.component';
import { GamificationRulesComponent } from './admin/gamification-rules/gamification-rules.component';
import { TargetComponent } from './admin/target/target.component';
import { EditTargetComponent } from './admin/target/edit-target.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:user_id/:hash', component: ResetPasswordComponent },
  { path: '', component: HomeComponent },

  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
     
      { path: 'notifications', component: NotificationsComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'user/:id', component: UserComponent },
      { path: 'users-teams', component: UserListComponent },
      { path: 'security', component: SecurityComponent },
      { path: 'goals', component: GoalsComponent },
      { path: 'gamification-rules', component: GamificationRulesComponent },
      { path: 'target', component: TargetComponent },
      { path: 'edit-target/:id', component: EditTargetComponent },
      { path: 'stats', component: StatsComponent },
      { path: 'core-values', component: CorevaluesComponent },
      { path: 'core-value', component: CoreValueComponent }
      
      
    ]
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
