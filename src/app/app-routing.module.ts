import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// import { AuthGuard, DeauthGuard } from './guards';
// import { Role } from './interfaces';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  // {
  //   path: '',
  //   redirectTo: 'tabs',
  //   pathMatch: 'full'
  // },
//   {
//     // Don't need AuthGuard as this page can be accessible from Login
//     path: 'graduate-verification-service',
//     // loadChildren: () => import('./pages/graduate-verification-service/graduate-verification-service.module').then(m => m.GraduateVerificationServicePageModule)
//   },
//   { // this path must always be at the end of the routes array
//     path: '**',
//     canActivate: [AuthGuard],
//     data: { role: Role.Student | Role.Lecturer | Role.Admin },
//     // loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundPageModule)
//   }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
