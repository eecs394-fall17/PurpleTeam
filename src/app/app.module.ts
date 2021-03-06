import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BookmarkPage } from "../pages/bookmark/bookmark";
import { NewPostPage } from "../pages/new-post/new-post";
import { ProfilePage } from "../pages/profile/profile";
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from "@angular/http";
import { Camera } from "@ionic-native/camera";

import { FirebaseService } from "../providers/firebase-service";
import { FileService } from "../providers/file-service";
import { VideoPlayer } from "@ionic-native/video-player";

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { AngularFireAuthModule } from "angularfire2/auth";
import {SMS} from "@ionic-native/sms";

@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    LoginPage,
    RegisterPage,
    HomePage,
    BookmarkPage,
    NewPostPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    LoginPage,
    RegisterPage,
    HomePage,
    BookmarkPage,
    NewPostPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseService,
    FileService,
    Camera,
    SMS,
    VideoPlayer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
