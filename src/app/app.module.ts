import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { environment } from './environment/environment';
import { setDefaultOptions } from 'esri-loader';
import { TableCountryComponent } from './table-country/table-country.component';

export function initialApp() {
  return () =>
    setDefaultOptions({
      url: environment.arcgis.js,
      css: environment.arcgis.css,
    });
}

@NgModule({
  declarations: [AppComponent, EsriMapComponent, TableCountryComponent],
  imports: [BrowserModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initialApp,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
