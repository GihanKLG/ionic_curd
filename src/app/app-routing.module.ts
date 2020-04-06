//app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'create', loadChildren: () => import('./student-create/student-create.module').then(m => m.StudentCreatePageModule) },
  { path: 'edit/:id', loadChildren: () => import('./student-edit/student-edit.module').then(m => m.StudentEditPageModule) },
  { path: 'list', loadChildren: () => import('./student-list/student-list.module').then(m => m.StudentListPageModule) },
  { path: 'detail', loadChildren: () => import('./student-detail/student-detail.module').then(m => m.StudentDetailPageModule) },
  { path: 'login', loadChildren: () => import('./student-login/student-login.module').then( m => m.StudentLoginPageModule) },
  { path: 'register', loadChildren: () => import('./student-register/student-register.module').then( m => m.StudentRegisterPageModule) },
  {
    path: 'googlemap',
    loadChildren: () => import('./googlemap/googlemap.module').then( m => m.GooglemapPageModule)
  },
  {
    path: 'googleheatmap',
    loadChildren: () => import('./googleheatmap/googleheatmap.module').then( m => m.GoogleheatmapPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

