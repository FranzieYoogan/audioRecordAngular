import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: '**', component: PageNotFoundComponentComponent }
];
