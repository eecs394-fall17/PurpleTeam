import {Component} from "@angular/core";
import {Platform, NavParams, ViewController, AlertController} from "ionic-angular";
import {FirebaseService} from "../../providers/firebase-service";
import {Post} from "../../models/post";
import firebase from 'firebase';

@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html'
})
export class NewPostPage {
  post: Post;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              public firebaseService: FirebaseService) {
    this.post = new Post("");
  }

  confirm() {
    if (this.post.description.length == 0) {
      this.presentAlert("No description!", "Please provide a description.");
      return
    } else if (!this.post.value || this.post.value < 0.01) {
      this.presentAlert("No payment offered!", "Please offer a payment.");
      return
    }
    // TODO users table + attaching posts to users
    this.post.authorKey = firebase.auth().currentUser.uid;
    this.post.timestamp = new Date().toString();
    this.firebaseService.addPost(this.post);
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  presentAlert(title, message) {
    const alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Try again']
    });
    alert.present();
  }
}
