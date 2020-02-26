import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { HomeComponent } from './templates/home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService
  ],
  exports: [
    HomeComponent,
  ],

})
export class CoreModule { 


}
