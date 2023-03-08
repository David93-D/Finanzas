import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilUsuarioComponent } from './auth/perfil-usuario/perfil-usuario.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { EditRegistrosComponent } from './finanzas-Personales/components/edit-registros/edit-registros.component';
import { FinanzasPersonalesComponent } from './finanzas-Personales/components/finanzas-personales/finanzas-personales.component';
import { AuthGuard } from './guards/auth.guard';
import { ConfirmacionGuard } from './guards/confirmacion.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {path: "signIn", component: SignInComponent},
  {path: "signUp", 
    canDeactivate: [ConfirmacionGuard], 
    component: SignUpComponent
  },
  {path: "finanzas-personales", 
    component: FinanzasPersonalesComponent, 
    canActivate: [AuthGuard, RoleGuard], // Comprobamos que se ha autenticado y que el rol de usuario sea el permitido
    data: { expectedRole: ["current", "admin"] } // Si no es un usario current o admin no puede acceder a finanzas-personales
  },
  {path: "edit-registros/:id", component: EditRegistrosComponent},
  {path: "perfil", 
    component: PerfilUsuarioComponent,
    canActivate: [AuthGuard], 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
