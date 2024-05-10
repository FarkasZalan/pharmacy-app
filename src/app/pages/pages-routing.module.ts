import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
    { 
        path: 'home', 
        component: MainPageComponent 
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
