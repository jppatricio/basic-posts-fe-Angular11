import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingLayoutComponent } from './landing-layout/landing-layout.component';



const routes: Routes = [
  // Definition of this module's child views
  {
    path: '', component: LandingLayoutComponent, children: [
      {
        path: '', component: HomeComponent
      },
      {
        path: '**', redirectTo: '', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
