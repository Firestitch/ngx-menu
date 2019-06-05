import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsMenuModule } from '@firestitch/menu';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './material.module';
import {
  SimpleMenuComponent,
  RemoteMenuComponent,
  ExamplesComponent,
  DialogComponent
} from './components';


const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsMenuModule,
    FsMessageModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
    FsExampleModule.forRoot(),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  entryComponents: [
    DialogComponent
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    SimpleMenuComponent,
    RemoteMenuComponent,
    DialogComponent
  ],
  providers: [
  ],
})
export class PlaygroundModule {
}
