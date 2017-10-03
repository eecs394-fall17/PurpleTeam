import { Component } from '@angular/core';
import { HomePage } from "../pages/home/home";
import { BookmarkPage } from "../pages/bookmark/bookmark";
import { LoginPage } from "../pages/login/login";

@Component({
  templateUrl: 'app.html'})
export class MyApp {
  loginPage = LoginPage;
  homePage = HomePage;
  bookmarkPage = BookmarkPage;
}
