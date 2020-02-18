import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import { DataTablesModule } from 'angular-datatables';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CookieService } from 'ngx-cookie-service';
import { NotifierModule } from "angular-notifier";
import { NgCircleProgressModule } from 'ng-circle-progress';
import { OrderModule } from 'ngx-order-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
// import { JwSocialButtonsModule } from 'jw-angular-social-buttons';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreValueComponent } from './core-value/core-value.component';
import { NavComponent } from './nav/nav.component';
import { UserComponent } from './user/user.component';
import { SidebarComponent } from './widgets/sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UserListComponent } from './user/user-list.component';
import { SecurityComponent } from './security/security.component';
import { StatsComponent } from './stats/stats.component';
import { LoginComponent } from './login/login.component';
import { GoalsComponent } from './admin/goals/goals.component';
import { GamificationRulesComponent } from './admin/gamification-rules/gamification-rules.component';
import { TargetComponent } from './admin/target/target.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditTargetComponent } from './admin/target/edit-target.component';
import { CorevaluesComponent } from './admin/corevalues/corevalues.component';
import { CorevaluefilterPipe } from './_pipe/corevaluefilter.pipe';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DashboardNavComponent } from './nav/dashboard-nav.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TeamsComponent } from './teams/teams.component';
import { EditGamificationRulesComponent } from './admin/gamification-rules/edit-gamification-rules.component';
import { TeamDetailsComponent } from './teams/team-details.component';
import { LiveDashboardComponent } from './live-dashboard/live-dashboard.component';
import { NotFoundComponent } from './widgets/not-found/not-found.component';
import { StartsComponent } from './widgets/starts/starts.component';
import { StatsSidebarComponent } from './widgets/stats-sidebar/stats-sidebar.component';
import { MostJobOrdersComponent } from './widgets/most-job-orders/most-job-orders.component';
import { MostInterviewsComponent } from './widgets/most-interviews/most-interviews.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { FaqsComponent } from './faqs/faqs.component';


export const DateFormats = {
  parse: {
                dateInput: ['YYYY-MM-DD']
            },
            display: {
                dateInput: 'YYYY-MM-DD',
                monthYearLabel: 'MMM YYYY',
                dateA11yLabel: 'LL',
                monthYearA11yLabel: 'MMMM YYYY',
            },
};

@NgModule({
  declarations: [
    AppComponent,
    CoreValueComponent,
    NavComponent,
    UserComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    NotificationsComponent,
    UserListComponent,
    SecurityComponent,
    StatsComponent,
    LoginComponent,
    GoalsComponent,
    GamificationRulesComponent,
    TargetComponent,
    UserProfileComponent,
    EditTargetComponent,
    CorevaluesComponent,
    CorevaluefilterPipe,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardNavComponent,
    SignUpComponent,
    TeamsComponent,
    EditGamificationRulesComponent,
    TeamDetailsComponent,
    LiveDashboardComponent,
    NotFoundComponent,
    StartsComponent,
    StatsSidebarComponent,
    MostJobOrdersComponent,
    MostInterviewsComponent,
    FaqsComponent,

  ],
  imports: [
    BrowserModule,
    OrderModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    CustomFormsModule,
    DataTablesModule,

    // JwSocialButtonsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgCircleProgressModule.forRoot({
      "radius": 60,
      "space": -6,
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "clockwise": true,
      "startFromZero": false,
      "outerStrokeLinecap": "square",
      'showSubtitle': true,
      "subtitle": "%",
    }),
    NotifierModule.withConfig({
       // Custom options in here
       position: {
 
          horizontal: {
         
            /**
             * Defines the horizontal position on the screen
             * @type {'left' | 'middle' | 'right'}
             */
            position: 'right',
         
            /**
             * Defines the horizontal distance to the screen edge (in px)
             * @type {number} 
             */
            distance: 12
         
          },
         
          vertical: {
         
            /**
             * Defines the vertical position on the screen
             * @type {'top' | 'bottom'}
             */
            position: 'top',
         
            /**
             * Defines the vertical distance to the screen edge (in px)
             * @type {number} 
             */
            distance: 12

          }
         
        }
    }),
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],

  providers: [CookieService,
             { provide: MAT_DATE_FORMATS, useValue: DateFormats }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
