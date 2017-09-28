import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { BookmarkPage } from "../pages/bookmark/bookmark";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from "@angular/http";
import { Camera } from "@ionic-native/camera";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseService } from "../providers/firebase-service";
import { FileService } from "../providers/file-service";
import {VideoPlayer} from "@ionic-native/video-player";

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyBiMNfzgXjYXu7aOOaUwY8bmd2JkdsprGo",
  authDomain: "udoit-abb6f.firebaseapp.com",
  databaseURL: "https://udoit-abb6f.firebaseio.com",
  projectId: "udoit-abb6f",
  storageBucket: "udoit-abb6f.appspot.com",
  messagingSenderId: "235655215407"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ItemDetailsPage,
    ListPage,
    BookmarkPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ItemDetailsPage,
    ListPage,
    BookmarkPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseService,
    FileService,
    Camera,
    VideoPlayer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
