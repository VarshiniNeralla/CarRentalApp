import { Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    
    {
        path:"register",
        component :SignupComponent
    },
    {
        path:"login",
        component:LoginComponent
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: "admin" , loadChildren : ()=> import("./modules/admin/admin.module").then(m=>m.AdminModule)
    },
    {
        path: "customer" , loadChildren : () => import("./modules/customers/customers.module").then(m=>m.CustomersModule)
    }
];

