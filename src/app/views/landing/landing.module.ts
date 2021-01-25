import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingLayoutComponent } from './landing-layout/landing-layout.component';
import { HomeComponent } from './home/home.component';
import { LandingRoutingModule } from './landing-routing.module';
import { WidgetsModule } from 'src/app/widgets/widgets.module';



@NgModule({
  declarations: [LandingLayoutComponent, HomeComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    WidgetsModule
  ]
})
export class LandingModule { }
