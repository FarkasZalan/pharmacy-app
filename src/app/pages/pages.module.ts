import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';

@NgModule({
    declarations: [
        MainPageComponent
    ],
    imports: [
        PagesRoutingModule,
        CommonModule,
    ]
})
export class PagesModule {
}
