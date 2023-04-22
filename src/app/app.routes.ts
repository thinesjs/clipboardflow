import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.page').then((m) => m.TabsPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'not-found',
    loadComponent: () => import('./pages/not-found/not-found.page').then( m => m.NotFoundPage)
  },
  {
    path: 'clipboard',
    loadComponent: () => import('./pages/clipboard/clipboard.page').then( m => m.ClipboardPage)
  },
  // {
  //   path: 'tabs',
  //   loadComponent: () => import('./pages/tabs/tabs.page').then( m => m.TabsPage)
  // },
];
