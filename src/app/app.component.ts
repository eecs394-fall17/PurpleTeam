import { Component } from '@angular/core';
import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";
import { BookmarkPage } from "../pages/bookmark/bookmark";
import {LoginPage} from "../pages/login/login";

@Component({
  templateUrl: 'app.html'})
export class MyApp {
  public rootPage: any = LoginPage;
  homePage = HomePage;
  bookmarkPage = BookmarkPage;
  listPage = ListPage;
}
