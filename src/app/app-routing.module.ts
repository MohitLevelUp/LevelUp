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
import { SignUpComponent } from './sign-up/sign-up.component';
import { TeamsComponent } from './teams/teams.component';
import { EditGamificationRulesComponent } from './admin/gamification-rules/edit-gamification-rules.component';
import { TeamDetailsComponent } from './teams/team-details.component';
import { LiveDashboardComponent } from './live-dashboard/live-dashboard.component';
import { NotFoundComponent } from './widgets/not-found/not-found.component';
import { StartsComponent } from './widgets/starts/starts.component';
import { MostJobOrdersComponent } from './widgets/most-job-orders/most-job-orders.component';
import { MostInterviewsComponent } from './widgets/most-interviews/most-interviews.component';


const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'team-details', component: TeamDetailsComponent },
  { path: 'live-dashboard', component: LiveDashboardComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:user_id/:hash', component: ResetPasswordComponent },
  { path: '', component: HomeComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'stats/most-starts', component: StartsComponent },
  { path: 'stats/most-job-orders', component: MostJobOrdersComponent },
  { path: 'stats/most-client-interviews', component: MostInterviewsComponent },
  // { path: 'not-found', component: NotFoundComponent },
  // { path: '**', redirectTo: '', pathMatch: 'full' },

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
      { path: 'edit-kpi/:id', component: EditGamificationRulesComponent },
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
