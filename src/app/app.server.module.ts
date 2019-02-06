import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import {NgModule} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    NoopAnimationsModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
    BrowserModule.withServerTransition({appId: 'app-root'})
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppServerModule {}
