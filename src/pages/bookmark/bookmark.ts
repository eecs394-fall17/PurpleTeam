import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FileService} from "../../providers/file-service";
import {FirebaseService} from "../../providers/firebase-service";

@Component({
  selector: 'page-bookmark',
  templateUrl: 'bookmark.html'
})
export class BookmarkPage {

  imageData: String;

  constructor(public navCtrl: NavController, public fileService: FileService,
              public firebaseService: FirebaseService) {
  }

  uploadPicture() {
    this.fileService.selectImage().then((image) => {
      this.imageData = image;
      return this.firebaseService.uploadImage(image, new Date().getTime() + ".jpg");
    }).then((uploadSnapshot: any) => {
      alert(uploadSnapshot.downloadURL);
    });
  }
}
