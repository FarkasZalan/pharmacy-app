import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { MedicineListComponent } from '../medicines/medicine-list/medicine-list.component';
import { MedicinePageComponent } from '../medicines/medicine-page/medicine-page.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [
        MainPageComponent,
        MedicineListComponent,
        MedicinePageComponent
    ],
    imports: [
        PagesRoutingModule,
        CommonModule,
        MatCardModule,
        FormsModule,
        MatSelectModule,
        MatInputModule,
    ]
})
export class PagesModule {
}
