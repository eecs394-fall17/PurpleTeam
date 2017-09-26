import { Component } from '@angular/core';
import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";
import { BookmarkPage } from "../pages/bookmark/bookmark";

@Component({
  templateUrl: 'app.html'})
export class MyApp {
  homePage = HomePage;
  bookmarkPage = BookmarkPage;
  listPage = ListPage;
}
