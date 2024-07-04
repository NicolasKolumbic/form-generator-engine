import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormGeneratorEngineModule } from './form-generator-engine';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { BussinessSchemaTranslatorService } from './services/bussiness-schema-translator.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgJsonEditorModule,
    FormGeneratorEngineModule.forRoot({
      schemaFactory: BussinessSchemaTranslatorService
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
