import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
// import { Role } from './interfaces';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'tabs',
    canActivate: [AuthGuard],
    // data: { role: Role.Student | Role.Lecturer | Role.Admin },
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    // data: { role: Role.Student | Role.Lecturer | Role.Admin },
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'clipboards',
    canActivate: [AuthGuard],
    // data: { role: Role.Student | Role.Lecturer | Role.Admin },
    loadChildren: () => import('./pages/clipboard/clipboard.module').then(m => m.ClipboardPageModule)
  },
  // {
  //   path: 'profile',
  //   canActivate: [AuthGuard],
  //   // data: { role: Role.Student | Role.Lecturer | Role.Admin },
  //   loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  // },
  {
    path: 'logout',
    canActivate: [AuthGuard],
    // data: { role: Role.Student | Role.Admin | Role.Lecturer },
    loadChildren: () => import('./pages/logout/logout.module').then(m => m.LogoutPageModule)
  },
  {
    path: '**',
    // canActivate: [AuthGuard],
    // data: { role: Role.Student | Role.Lecturer | Role.Admin },
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
