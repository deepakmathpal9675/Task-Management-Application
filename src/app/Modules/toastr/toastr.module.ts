import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    ToastrModule.forRoot(), // ToastrModule added
  ],
  exports: [
    ToastrModule // Export ToastrModule for use in other components
  ]
})
export class CustomToastrModule {}