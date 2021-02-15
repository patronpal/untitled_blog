import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RatesComponent} from "./components/rates/rates.component";

const routes: Routes = [
  {path:'rates', component: RatesComponent},
  {path:'**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
