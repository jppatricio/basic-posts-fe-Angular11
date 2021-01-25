import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // Definition of routes with lazy loading childs (Better when adding AUniversal for SSR)
  {
    path: '',
    loadChildren: () => import(`./views/landing/landing.module`).then(m => m.LandingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
