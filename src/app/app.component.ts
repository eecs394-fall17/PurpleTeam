import {Component, ViewChild} from '@angular/core';
import { HomePage } from "../pages/home/home";
import { BookmarkPage } from "../pages/bookmark/bookmark";
import { LoginPage } from "../pages/login/login";
import {MenuController, ModalController, Nav, Platform} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import { ProfilePage } from "../pages/profile/profile";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  homePage = HomePage;
  bookmarkPage = BookmarkPage;
  profilePage = ProfilePage;

  @ViewChild(Nav) nav: Nav;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public splashScreen: SplashScreen,
    public modalController: ModalController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      this.splashScreen.hide();

      const loginModal = this.modalController.create(LoginPage);
      loginModal.present();
    });
  }
}
