import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeletorCidadeComponent } from './components/seletor-cidade/seletor-cidade.component';

const routes: Routes = [
  {path: 'clima', component: SeletorCidadeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
