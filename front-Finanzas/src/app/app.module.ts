import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FinanzasPersonalesComponent } from './finanzas-Personales/components/finanzas-personales/finanzas-personales.component';
import { ListaRegistrosComponent } from './finanzas-Personales/components/lista-registros/lista-registros.component';
import { ItemRegistrosComponent } from './finanzas-Personales/components/item-registros/item-registros.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditRegistrosComponent } from './finanzas-Personales/components/edit-registros/edit-registros.component';

import { FormsModule } from '@angular/forms';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { PerfilUsuarioComponent } from './auth/perfil-usuario/perfil-usuario.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FinanzasPersonalesComponent,
    ListaRegistrosComponent,
    ItemRegistrosComponent,
    EditRegistrosComponent,
    SignInComponent,
    SignUpComponent,
    PerfilUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    // JWT
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    // Token interceptor
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
