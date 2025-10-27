import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FsMenuModule } from 'package';
import { FsMessageModule } from '@firestitch/message';
import { FsExampleModule } from '@firestitch/example';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FsFileModule } from '@firestitch/file';
import { provideRouter, Routes } from '@angular/router';
import { ExamplesComponent } from './app/components';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FsMenuModule, FsMessageModule.forRoot(), FsExampleModule.forRoot(), FormsModule, FsFileModule.forRoot()),
        provideAnimations(),
        provideRouter(routes)
    ]
})
  .catch(err => console.error(err));

