import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FileService} from "../../providers/file-service";

@Component({
  selector: 'page-bookmark',
  templateUrl: 'bookmark.html'
})
export class BookmarkPage {
  constructor( public navCtrl: NavController, public fileService: FileService) {
    fileService.getPicture();
  }
}
