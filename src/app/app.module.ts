import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CookieService } from 'ngx-cookie-service';
import { NotifierModule } from "angular-notifier";




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreValueComponent } from './core-value/core-value.component';
import { NavComponent } from './nav/nav.component';
import { UserComponent } from './user/user.component';
import { SidebarComponent } from './widgets/sidebar/sidebar.component';
import { SettingBarComponent } from './widgets/setting-bar/setting-bar.component';
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

@NgModule({
  declarations: [
    AppComponent,
    CoreValueComponent,
    NavComponent,
    UserComponent,
    SidebarComponent,
    SettingBarComponent,
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
    DashboardNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    NgMultiSelectDropDownModule.forRoot(),
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
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
