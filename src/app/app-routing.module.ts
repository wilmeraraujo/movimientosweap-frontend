import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { TipoDocumentoComponent } from './components/tipo-documento/tipo-documento.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path:'sidenav', component: SidenavComponent},
  {path:'home', component: HomeComponent},
  {path:'tipo-documento', component: TipoDocumentoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
