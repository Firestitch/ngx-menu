import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { FsExampleModule } from '@firestitch/example';
import { FsFileModule } from '@firestitch/file';
import { FsMessageModule } from '@firestitch/message';
import { FsMenuModule } from 'package';


import { AppComponent } from './app.component';
import {
  DialogComponent,
  ExamplesComponent,
  GroupsMenuComponent,
  RemoteMenuComponent,
  SimpleMenuComponent,
} from './components';
import { AppMaterialModule } from './material.module';


const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FsMenuModule,
    FsMessageModule.forRoot(),
    FsExampleModule.forRoot(),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsFileModule.forRoot(),
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
    GroupsMenuComponent,
    DialogComponent,
  ],
})
export class PlaygroundModule {
}
