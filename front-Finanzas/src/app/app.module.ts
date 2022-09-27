import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FinanzasPersonalesComponent } from './finanzas-Personales/components/finanzas-personales/finanzas-personales.component';
import { ListaRegistrosComponent } from './finanzas-Personales/components/lista-registros/lista-registros.component';
import { ItemRegistrosComponent } from './finanzas-Personales/components/item-registros/item-registros.component';

import { HttpClientModule } from '@angular/common/http';
import { EditRegistrosComponent } from './finanzas-Personales/components/edit-registros/edit-registros.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FinanzasPersonalesComponent,
    ListaRegistrosComponent,
    ItemRegistrosComponent,
    EditRegistrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
