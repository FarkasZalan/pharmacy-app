import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ProfileListComponent } from '../profile/profile-list/profile-list.component';
import { MedicinePageComponent } from '../medicines/medicine-page/medicine-page.component';

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
    { 
        path: 'medicine-details/:id', 
        component: MedicinePageComponent 
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
