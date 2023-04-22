import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { Role } from '../../interfaces';
import { AuthGuard } from '../../guards/auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        canActivate: [AuthGuard],
        // data: { role: Role.Student | Role.Lecturer | Role.Admin },
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'clipboards',
        canActivate: [AuthGuard],
        // data: { role: Role.Student },
        loadChildren: () => import('../clipboard/clipboard.module').then(m => m.ClipboardPageModule)
      },
      // {
      //   path: 'profile',
      //   canActivate: [AuthGuard],
      //   // data: { role: Role.Lecturer | Role.Admin },
      //   loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      // },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
