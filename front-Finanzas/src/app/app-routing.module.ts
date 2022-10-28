import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { EditRegistrosComponent } from './finanzas-Personales/components/edit-registros/edit-registros.component';
import { FinanzasPersonalesComponent } from './finanzas-Personales/components/finanzas-personales/finanzas-personales.component';

const routes: Routes = [
  {path: "signIn", component: SignInComponent},
  {path: "signUp", component: SignUpComponent},
  {path: "finanzas-personales", component: FinanzasPersonalesComponent },
  {path: "edit-registros/:id", component: EditRegistrosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
