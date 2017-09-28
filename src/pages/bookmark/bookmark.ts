import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FileService} from "../../providers/file-service";
import {FirebaseService} from "../../providers/firebase-service";
import { VideoPlayer } from '@ionic-native/video-player';

@Component({
  selector: 'page-bookmark',
  templateUrl: 'bookmark.html'
})
export class BookmarkPage {

  imageData: String;
  videoData: String;

  constructor(private videoPlayer: VideoPlayer, public navCtrl: NavController, public fileService: FileService,
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

  uploadVideo() {
    this.fileService.selectImage().then((video) => {
      this.videoData = video;
      return this.firebaseService.uploadVideo(video, new Date().getTime() + ".mov");
    }).then((uploadSnapshot: any) => {
      alert(uploadSnapshot.downloadURL);
    });
  }

  playVideo() {
    this.videoPlayer.play('https://www.youtube.com/watch?v=p5eoHHrTKvs').then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });
  }
}
