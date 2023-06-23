import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsRoutingModule } from './layouts-routing.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { FooterComponent } from './footer/footer.component';
import { DefaultLayoutComponent } from './default/default.component';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [
    SidenavComponent,
    TitlebarComponent,
    FooterComponent,
    DefaultLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutsRoutingModule
  ],
  exports: [
    SharedModule
  ]
})
export class LayoutsModule { }
