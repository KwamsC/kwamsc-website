import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../shared/organisms/footer/footer.component';
import { MenuComponent } from '../shared/organisms/menu/menu.component';

@NgModule({
  declarations: [FooterComponent, MenuComponent],
  
  imports: [
    CommonModule, RouterModule
  ],

  exports:[
    CommonModule, 
    FooterComponent, 
    MenuComponent,
    RouterModule
  ],
})
export class SharedModule { }
