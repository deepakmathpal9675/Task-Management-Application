import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';

import { NativeDateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter, MatNativeDateModule } from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MaterialModuleModule  } from "./Modules/MaterialModule/MaterialModule.module";
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { projectReducer } from './store/project.reducer';
import { authReducer } from './store/auth.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
export function localStorageReducer(reducer: any) {
  return localStorageSync({ keys: ['projects', 'auth'], rehydrate: true })(reducer);
}
// Define the format for the date
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY', // Adjust according to your format
  },
  display: {
    dateInput: 'DD/MM/YYYY', // Adjust according to your format
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    // NavbarComponent,
    // DashboardComponent,
    // ProjectDetailComponent,TranslateModul
  ],
  imports: [
    NavbarComponent,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    StoreModule.forRoot({
      projects: projectReducer,
      auth: authReducer,
    }),
    MatSnackBarModule,
    //ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment }),
    MatNativeDateModule,
    MatToolbarModule,
    MaterialModuleModule, 
  ],
  exports: [NavbarComponent],

  providers: [
   
  ],
})
export class AppModule { }
