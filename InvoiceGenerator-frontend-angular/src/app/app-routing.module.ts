import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BusinessListComponent } from './business-list/business-list.component';
import { ClientListComponent } from './client-list/client-list.component';
import { InvoiceFormatComponent } from './invoice-format/invoice-format.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: InvoiceComponent, canActivate: [AuthGuard]},
  { path: 'invoice', component: InvoiceComponent, canActivate: [AuthGuard] },
  { path: 'invoiceFormat', component: InvoiceFormatComponent, canActivate: [AuthGuard] },
  { path: 'businessList', component: BusinessListComponent, canActivate: [AuthGuard] },
  { path: 'clientList', component: ClientListComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
