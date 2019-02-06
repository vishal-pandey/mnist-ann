import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    AppModule,
    BrowserModule.withServerTransition({appId: 'app-root'})
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppBrowserModule {}
