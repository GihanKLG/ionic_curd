//app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'list', 
    loadChildren: () => import('./student-list/student-list.module').then(m => m.StudentListPageModule)
  },
  { path: 'login', 
    loadChildren: () => import('./student-login/student-login.module').then( m => m.StudentLoginPageModule) 
  },
  {
    path: 'googlemap',
    loadChildren: () => import('./googlemap/googlemap.module').then( m => m.GooglemapPageModule)
  },
  {
    path: 'googleheatmap',
    loadChildren: () => import('./googleheatmap/googleheatmap.module').then( m => m.GoogleheatmapPageModule)
  },
  {
    path: 'clustermap',
    loadChildren: () => import('./clustermap/clustermap.module').then( m => m.ClustermapPageModule)
  },
  {
    // path: 'dashboard/:loc_details',
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

