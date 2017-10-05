import { Component } from '@angular/core';
import { HomePage } from "../pages/home/home";
import { BookmarkPage } from "../pages/bookmark/bookmark";
import { ProfilePage } from "../pages/profile/profile";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  homePage = HomePage;
  bookmarkPage = BookmarkPage;
  profilePage = ProfilePage;
}
